import React from 'react'

const Text: React.FC<TextProps> = ({
  children,
  as = 'p',
  color = '#ffffff',
  bulletColor,
  uppercase = false,
  lowercase = false,
  size = 'md',
  align = as === 'li' ? 'left' : 'center',
  expanded = false,
  leading = 'normal',
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
    xs: 'text-xs', // 12px
    sm: 'text-sm', // 14px
    md: 'text-base', // 16px (padrão)
    lg: 'text-lg', // 18px
    xl: 'text-xl' // 20px
  }

  // Mapeamento de alinhamentos
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  // Mapeamento de line-height
  const leadingClasses = {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose'
  }

  // Componente dinâmico
  const Component = as

  // Se for li, renderiza com bullet
  if (as === 'li') {
    return (
      <Component
        className={`
          ${expanded ? 'font-mosvita-expanded' : 'font-mosvita'}
          ${sizeClasses[size]}
          font-medium
          ${uppercase ? 'uppercase' : ''}
          ${lowercase ? 'lowercase' : ''}
          ${leadingClasses[leading as keyof typeof leadingClasses] || leading} // Usa a prop leading
          tracking-normal
          ${alignClasses[align]}
          flex items-center gap-2
          ${className}
        `}
        style={{ color }}
      >
        {/* Bullet personalizado */}
        <span style={{ color: bulletColor || color }}>•</span>

        {/* Conteúdo do item */}
        <span className="flex-1">{children}</span>
      </Component>
    )
  }

  // Renderização normal para p e span
  return (
    <Component
      className={`
        ${expanded ? 'font-mosvita-expanded' : 'font-mosvita'}
        ${sizeClasses[size]}
        font-medium
        ${uppercase ? 'uppercase' : ''}
        ${lowercase ? 'lowercase' : ''}
        ${leadingClasses[leading as keyof typeof leadingClasses] || leading} // Usa a prop leading
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
export default Text
