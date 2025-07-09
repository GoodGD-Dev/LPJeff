import { AccordionItemProps } from '@/types/ui'
import React, { useState, useRef, useEffect } from 'react'

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  icon,
  children,
  index,
  openIndex,
  setOpenIndex,
  backgroundColor = 'bg-gray-900',
  titleColor = 'text-white',
  contentColor = 'text-gray-300',
  hoverColor = 'hover:bg-gray-800'
}) => {
  const isOpen = index === openIndex
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<string>('0px')

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px')
    }
  }, [isOpen, children]) // Adicione children como dependência para re-calcular se o conteúdo mudar

  const toggleAccordion = () => {
    setOpenIndex(isOpen ? null : index)
  }

  return (
    <div
      className={`mb-4 ${backgroundColor} rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto`}
    >
      {/* Cabeçalho do Acordeão (Card Arredondado) */}
      <button
        className={`flex items-center justify-between w-full p-6 text-left ${titleColor} focus:outline-none ${hoverColor} transition-colors duration-200`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          {/* SVG Centralizado dentro do cabeçalho */}
          {icon && <div className="mr-3 flex-shrink-0">{icon}</div>}
          <span className="text-lg font-medium">{title}</span>
        </div>
      </button>

      {/* Conteúdo do Acordeão */}
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: contentHeight }}
      >
        <div className={`p-6 pt-0 ${contentColor}`}>{children}</div>
      </div>
    </div>
  )
}

export default AccordionItem
