import React from 'react'

interface TextProps {
  children: React.ReactNode
  as?: 'p' | 'span' | 'li'
  color?: string
  bulletColor?: string
  uppercase?: boolean
  lowercase?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'left' | 'center' | 'right'
  expanded?: boolean
  className?: string
}

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
  className = ''
}) => {
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
          leading-none
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

export default Text

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- children (React.ReactNode) - O texto

PROPS OPCIONAIS (com valores padrão):
- as?: 'p' | 'span' | 'li' (padrão: 'p')
- color?: string (padrão: '#ffffff')
- bulletColor?: string (só para li - padrão: mesma cor do texto)
- uppercase?: boolean (padrão: false)
- lowercase?: boolean (padrão: false)
- size?: 'sm' | 'md' | 'lg' | 'xl' (padrão: 'md')
- align?: 'left' | 'center' | 'right' (padrão: 'center' para p/span, 'left' para li)
- expanded?: boolean (padrão: false) - Usa versão expandida da fonte
- className?: string (padrão: '')

EXEMPLOS:

// Parágrafo básico
<Text>Meu parágrafo</Text>

// Span inline
<Text as="span">Texto inline</Text>

// Item de lista
<Text as="li">Item da lista</Text>

// Lista completa
<ul className="space-y-2">
  <Text as="li">Primeiro item</Text>
  <Text as="li" color="#3b82f6">Segundo item azul</Text>
  <Text as="li" bulletColor="#10b981" color="#f59e0b">
    Terceiro item com bullet verde
  </Text>
</ul>

// Com cor personalizada
<Text color="#3b82f6">Parágrafo azul</Text>

// Tamanho grande em maiúsculo
<Text size="lg" uppercase>PARÁGRAFO GRANDE</Text>

// Lista com bullet customizado
<Text as="li" color="#ec4899" bulletColor="#10b981" size="lg">
  Item rosa com bullet verde
</Text>

// Exemplo completo
<Text
  as="span"
  size="lg"
  color="#ec4899"
  uppercase
  expanded
  align="left"
  className="mb-4"
>
  TEXTO SPAN COMPLETO
</Text>
*/
