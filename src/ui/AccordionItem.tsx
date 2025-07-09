// src/components/AccordionItem.tsx
import React, { useState, useRef, useEffect } from 'react'

interface AccordionItemProps {
  /** O título do item do acordeão. */
  title: string
  /** O ícone SVG a ser exibido ao lado do título. */
  icon?: React.ReactNode
  /** O conteúdo a ser exibido quando o acordeão é aberto. */
  children: React.ReactNode
  /** O índice do item, usado para controlar qual item está aberto. */
  index: number
  /** O índice do item atualmente aberto (controlado pelo componente pai). */
  openIndex: number | null
  /** Função de callback para notificar o pai sobre qual item foi clicado. */
  setOpenIndex: (index: number | null) => void
  /** Cor de fundo do card (classe Tailwind) */
  backgroundColor?: string
  /** Cor do texto do título (classe Tailwind) */
  titleColor?: string
  /** Cor do texto do conteúdo (classe Tailwind) */
  contentColor?: string
  /** Cor de fundo do hover (classe Tailwind) */
  hoverColor?: string
}

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
