import React, { useRef, useEffect, useState, useCallback } from 'react'
import { TimelineColors, TimelineListProps } from '@types'

const DEFAULT_COLORS: TimelineColors = {
  activeCircle: 'bg-primary',
  inactiveCircle: 'bg-primary/60',
  activeLine: 'bg-primary',
  inactiveLine: 'bg-text/60',
  activeText: 'text-text',
  inactiveText: 'text-text/60'
}

const TimelineList: React.FC<TimelineListProps> = ({
  items,
  colors = DEFAULT_COLORS
}) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [activeItems, setActiveItems] = useState<Set<number>>(new Set([0]))
  const activeItemsRef = useRef<Set<number>>(new Set([0])) // ← Nova ref para acessar o valor atual
  const lastScrollY = useRef(0)

  // Mantém a ref sincronizada com o state
  useEffect(() => {
    activeItemsRef.current = activeItems
  }, [activeItems])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollingDown = currentScrollY > lastScrollY.current
    lastScrollY.current = currentScrollY

    const newActiveItems = new Set(activeItemsRef.current) // ← Usa a ref em vez da dependência
    const viewportHeight = window.innerHeight

    const activationTrigger = viewportHeight * 0.4
    const deactivationTrigger = viewportHeight * 0.7

    itemRefs.current.forEach((item, index) => {
      if (!item) return

      const itemRect = item.getBoundingClientRect()

      if (scrollingDown) {
        if (itemRect.top <= activationTrigger) {
          newActiveItems.add(index)
        }
      } else {
        if (itemRect.bottom >= deactivationTrigger) {
          newActiveItems.delete(index)
        }
      }
    })

    let finalActiveItems = new Set<number>()

    if (scrollingDown) {
      let tempHighestActiveIndex = -1
      newActiveItems.forEach((idx) => {
        if (idx > tempHighestActiveIndex) {
          tempHighestActiveIndex = idx
        }
      })

      for (let i = 0; i <= tempHighestActiveIndex; i++) {
        finalActiveItems.add(i)
      }
    } else {
      // Rolando para cima
      let tempLowestActiveIndex = items.length
      newActiveItems.forEach((idx) => {
        if (idx < tempLowestActiveIndex) {
          tempLowestActiveIndex = idx
        }
      })

      if (newActiveItems.size === 0 && currentScrollY > 0 && items.length > 0) {
        if (
          itemRefs.current[0] &&
          itemRefs.current[0]!.getBoundingClientRect().top < viewportHeight
        ) {
          finalActiveItems.add(0)
        }
      } else {
        for (let i = tempLowestActiveIndex; i < items.length; i++) {
          if (newActiveItems.has(i)) {
            finalActiveItems.add(i)
          }
        }
      }
    }

    // Caso especial: se estiver no topo da página, apenas o primeiro item deve estar ativo
    if (currentScrollY === 0 && items.length > 0) {
      finalActiveItems.clear()
      finalActiveItems.add(0)
    }

    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight
    if (currentScrollY >= scrollHeight && items.length > 0) {
      finalActiveItems.clear()
      for (let i = 0; i < items.length; i++) {
        finalActiveItems.add(i)
      }
    }

    // Só atualiza se realmente mudou
    if (!setsAreEqual(finalActiveItems, activeItemsRef.current)) {
      setActiveItems(finalActiveItems)
    }
  }, [items.length]) // ← Removido activeItems das dependências

  // Função auxiliar para comparar Sets
  const setsAreEqual = (set1: Set<number>, set2: Set<number>) => {
    if (set1.size !== set2.size) return false
    return Array.from(set1).every((item) => set2.has(item))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const getLineHeight = useCallback(
    (index: number) => {
      if (!activeItems.has(index) || index >= items.length - 1) return 0
      if (!activeItems.has(index + 1)) return 0

      const currentItem = itemRefs.current[index]
      const nextItem = itemRefs.current[index + 1]

      if (!currentItem || !nextItem) return 0

      const currentRect = currentItem.getBoundingClientRect()
      const nextRect = nextItem.getBoundingClientRect()

      const startY = currentRect.top + currentRect.height / 2
      const endY = nextRect.top + nextRect.height / 2

      return Math.max(0, endY - startY)
    },
    [activeItems, items.length]
  )

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center w-full">
        <ul className="relative">
          {items.map((item, index) => {
            const isActive = activeItems.has(index)
            const isLineActive = isActive && activeItems.has(index + 1)
            const lineHeight = getLineHeight(index)

            return (
              <li
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative flex items-center mb-16 pl-12 transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {/* Círculo do número */}
                <div
                  className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ease-in-out ${
                    isActive ? colors.activeCircle : colors.inactiveCircle
                  } text-secondary`}
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
                  className={`text-lg ml-2 ${isActive ? colors.activeText : colors.inactiveText}`}
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
