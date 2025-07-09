// src/components/TimelineList.tsx
import { TimelineColors, TimelineListProps } from '@/types/layout'
import React, { useRef, useEffect, useState, useCallback } from 'react'

const DEFAULT_COLORS: TimelineColors = {
  activeCircle: 'bg-[#D9FF85]',
  inactiveCircle: 'bg-[#D9FF85]/60',
  activeLine: 'bg-[#D9FF85]',
  inactiveLine: 'bg-gray-400',
  activeText: 'text-white', // Esta cor é para o texto do item da timeline, não para o número no círculo
  inactiveText: 'text-gray-300' // Esta cor é para o texto do item da timeline, não para o número no círculo
}

const TimelineList: React.FC<TimelineListProps> = ({
  items,
  colors = DEFAULT_COLORS,
  threshold = 0.8,
  rootMargin = '0px 0px -20% 0px'
}) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [fullyVisibleItems, setFullyVisibleItems] = useState<Set<number>>(
    new Set()
  )

  const updateVisibility = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const newVisible = new Set(visibleItems)
      const newFullyVisible = new Set(fullyVisibleItems)

      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-index') || '-1')
        if (index === -1) return

        if (entry.isIntersecting) {
          newVisible.add(index)
          if (entry.intersectionRatio >= threshold) {
            newFullyVisible.add(index)
          } else {
            newFullyVisible.delete(index)
          }
        } else {
          newVisible.delete(index)
          newFullyVisible.delete(index)
        }
      })

      setVisibleItems(newVisible)
      setFullyVisibleItems(newFullyVisible)
    },
    [visibleItems, fullyVisibleItems, threshold]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(updateVisibility, {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      rootMargin
    })

    const currentRefs = itemRefs.current
    currentRefs.forEach((item) => item && observer.observe(item))

    return () => {
      currentRefs.forEach((item) => item && observer.unobserve(item))
    }
  }, [items, updateVisibility, rootMargin])

  const getLineHeight = useCallback(
    (index: number) => {
      if (!fullyVisibleItems.has(index) || index >= items.length - 1) return 0

      const currentItem = itemRefs.current[index]
      const nextItem = itemRefs.current[index + 1]

      if (!currentItem || !nextItem) return 0

      // Só desenha a linha se o próximo item também estiver totalmente visível
      if (!fullyVisibleItems.has(index + 1)) return 0

      const currentRect = currentItem.getBoundingClientRect()
      const nextRect = nextItem.getBoundingClientRect()

      const startY = currentRect.top + currentRect.height / 2
      const endY = nextRect.top + nextRect.height / 2

      return Math.max(0, endY - startY)
    },
    [fullyVisibleItems, items.length]
  )

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center w-full">
        <ul className="relative">
          {items.map((item, index) => {
            const isVisible = visibleItems.has(index)
            const isFullyVisible = fullyVisibleItems.has(index)
            const isLineActive = isFullyVisible && index < items.length - 1
            const lineHeight = getLineHeight(index)

            return (
              <li
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative flex items-center mb-16 pl-12 transition-opacity duration-500 ${
                  isVisible ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {/* Círculo do número */}
                <div
                  className={`absolute left-0  w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ease-in-out ${
                    isFullyVisible ? colors.activeCircle : colors.inactiveCircle
                  } text-black`}
                >
                  {index + 1}
                </div>

                {/* Linha vertical */}
                {index < items.length - 1 && (
                  <div
                    className={`absolute left-5 w-0.5 transition-all duration-700 ease-in-out origin-top ${
                      isLineActive ? colors.activeLine : colors.inactiveLine
                    } ${isLineActive ? 'scale-y-100' : 'scale-y-0'}`}
                    style={{
                      top: '2.15rem',
                      height: `${lineHeight}px`
                    }}
                  />
                )}

                {/* Texto do item */}
                <span
                  className={`text-lg ml-2 ${isVisible ? colors.activeText : colors.inactiveText}`}
                >
                  {item}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TimelineList
