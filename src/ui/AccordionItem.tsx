import { AccordionItemProps } from '@/types/ui'
import React, { useState, useRef, useEffect } from 'react'
import Title from './Title'

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  icon,
  children,
  index,
  openIndex,
  setOpenIndex,
  // Cores padrão (quando fechado)
  backgroundColor = 'bg-[#202020]',
  titleColor = 'text-white',
  contentColor = 'text-gray-300',
  iconColor = 'text-[#D9FF85]',
  // Cores quando aberto
  openBackgroundColor = 'bg-[#D9FF85]',
  openTitleColor = 'text-black',
  openContentColor = 'text-gray-700',
  hoverColor = 'hover:bg-gray-800'
}) => {
  const isOpen = index === openIndex
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<string>('0px')

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px')
    }
  }, [isOpen, children])

  const toggleAccordion = () => {
    setOpenIndex(isOpen ? null : index)
  }

  return (
    <div
      className={`
        mb-4
        rounded-xl
        shadow-lg
        overflow-hidden
        max-w-2xl
        mx-auto
        ${isOpen ? openBackgroundColor : backgroundColor}
        transition-colors
        duration-300
      `}
    >
      {/* Cabeçalho do Acordeão (o botão clicável) */}
      <button
        className={`
          flex
          items-center
          justify-between
          w-full
          text-left
          focus:outline-none
          ${hoverColor}
          transition-colors
          duration-200
          ${isOpen ? 'px-8 py-2 mt-6' : 'p-8'}
        `}
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          {/* SVG/Ícone - Cor condicional baseada no estado de abertura */}
          {icon && (
            <div
              className={`w-10 h-10 mr-5 flex-shrink-0 ${isOpen ? openTitleColor : iconColor}`}
            >
              {icon}
            </div>
          )}
          {/* Título - Alinhado à esquerda e cor condicional */}
          <Title
            as="h3"
            size="xs"
            align="left"
            color={isOpen ? openTitleColor : titleColor}
          >
            {title}
          </Title>
        </div>
      </button>

      {/* Conteúdo do Acordeão */}
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: contentHeight }}
      >
        <div
          className={`
            pt-0
            text-sm
            font-mosvita
            leading-5
            tracking-normal
            ${isOpen ? openContentColor : contentColor}
            ${isOpen ? 'px-4 pb-8' : 'px-8 pb-0'} {/* Padding do conteúdo: maior pb quando aberto, menor quando fechado */}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default AccordionItem
