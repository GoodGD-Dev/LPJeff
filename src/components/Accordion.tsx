import React, { useState } from 'react'
import { AccordionItem } from '@ui'
import { AccordionProps } from '@/types'

const Accordion: React.FC<AccordionProps> = ({
  allowMultipleOpen = false,
  items
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

  const handleSetOpenIndex = (index: number | null) => {
    if (allowMultipleOpen) {
      setOpenIndices((prev) => {
        const newSet = new Set(prev)
        if (index === null) {
          return new Set()
        }
        if (newSet.has(index)) {
          newSet.delete(index)
        } else {
          newSet.add(index)
        }
        return newSet
      })
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Contêiner centralizador para o acordeão */}
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          icon={item.icon}
          backgroundColor={item.backgroundColor}
          titleColor={item.titleColor}
          contentColor={item.contentColor}
          hoverColor={item.hoverColor}
          openIndex={
            allowMultipleOpen
              ? openIndices.has(index)
                ? index
                : null
              : openIndex
          }
          setOpenIndex={handleSetOpenIndex}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

export default Accordion
