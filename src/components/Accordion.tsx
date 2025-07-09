import React, { useState } from 'react'
import AccordionItem from '@ui/AccordionItem'

interface AccordionProps {
  /** Permite que múltiplos itens do acordeão estejam abertos ao mesmo tempo. */
  allowMultipleOpen?: boolean
  /** Um array de objetos com o título, ícone e conteúdo de cada item do acordeão. */
  items: {
    title: string
    icon?: React.ReactNode
    content: React.ReactNode
    backgroundColor?: string
    titleColor?: string
    contentColor?: string
    hoverColor?: string
  }[]
}

const Accordion: React.FC<AccordionProps> = ({
  allowMultipleOpen = false,
  items
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null) // Para single open
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set()) // Para multiple open

  const handleSetOpenIndex = (index: number | null) => {
    if (allowMultipleOpen) {
      setOpenIndices((prev) => {
        const newSet = new Set(prev)
        if (index === null) {
          return new Set() // Fecha todos se null for passado para multiple
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
