import React from 'react'

interface TitleProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span'
  color?: string
  uppercase?: boolean
  lowercase?: boolean
  bold?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'left' | 'center' | 'right'
  expanded?: boolean
  className?: string
}

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
      {children}
    </Component>
  )
}

export default Title

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- children (React.ReactNode) - O texto do título

PROPS OPCIONAIS (com valores padrão):
- as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' (padrão: 'h1')
- color?: string (padrão: '#ffffff')
- uppercase?: boolean (padrão: false)
- lowercase?: boolean (padrão: false)
- bold?: boolean (padrão: false)
- size?: 'sm' | 'md' | 'lg' | 'xl' (padrão: 'md')
- align?: 'left' | 'center' | 'right' (padrão: 'center')
- expanded?: boolean (padrão: false) - Usa versão expandida da fonte
- className?: string (padrão: '')

EXEMPLOS:

// Básico (h1 por padrão)
<Title>Meu Título</Title>

// Como h2
<Title as="h2" size="lg">Subtítulo</Title>

// Como h3 com cor
<Title as="h3" color="#3b82f6" bold>Título Azul</Title>

// Como span inline
<Title as="span" size="sm" color="#10b981">Texto inline</Title>

// h4 em maiúsculo expandido
<Title as="h4" uppercase expanded bold>TÍTULO H4 EXPANDIDO</Title>

// Exemplo completo
<Title
  as="h2"
  size="xl"
  color="#ec4899"
  bold
  uppercase
  expanded
  align="center"
  className="mb-6"
>
  TÍTULO H2 COMPLETO
</Title>

// Span pequeno para labels
<Title
  as="span"
  size="sm"
  color="#6b7280"
  lowercase
  align="left"
>
  label pequeno
</Title>
*/
