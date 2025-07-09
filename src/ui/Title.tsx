import React from 'react'

const Title: React.FC<TitleProps> = ({
  children,
  as = 'h1',
  color = '#ffffff',
  uppercase = false,
  lowercase = false,
  bold = false,
  size = 'md',
  align = 'center',
  expanded = false,
  className = ''
}) => {
  // Função para processar quebras de linha
  const processText = (text: React.ReactNode) => {
    if (typeof text === 'string') {
      return text.split('\n').map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))
    }
    return text
  }

  // Mapeamento de tamanhos
  const sizeClasses = {
    sm: 'text-2xl', // 24px
    md: 'text-[32px]', // 32px
    lg: 'text-4xl', // 36px
    xl: 'text-5xl' // 48px
  }

  // Mapeamento de alinhamentos
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  // Componente dinâmico
  const Component = as

  return (
    <Component
      className={`
        ${expanded ? 'font-mosvita-expanded' : 'font-mosvita'}
        ${sizeClasses[size]}
        ${bold ? 'font-semibold' : 'font-light'}
        ${uppercase ? 'uppercase' : ''}
        ${lowercase ? 'lowercase' : ''}
        leading-none
        tracking-normal
        ${alignClasses[align]}
        ${className}
      `}
      style={{ color }}
    >
      {processText(children)}
    </Component>
  )
}

export default Title
