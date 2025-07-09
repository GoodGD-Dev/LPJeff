import { ButtonProps } from '@/types/ui'
import React from 'react'

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  bgColor = '#D9FF85',
  textColor = '#000000',
  size = 'md',
  expanded = false,
  disabled = false,
  onClick,
  className = ''
}) => {
  // Mapeamento de tamanhos
  const sizeClasses = {
    sm: {
      width: 'w-64', // 256px
      height: 'h-9', // 36px
      padding: 'px-3 py-2',
      text: 'text-sm', // 14px
      radius: 'rounded-2xl'
    },
    md: {
      width: 'w-80', // 320px (aproximado de 316)
      height: 'h-11', // 44px
      padding: 'px-4 py-2.5',
      text: 'text-base', // 16px
      radius: 'rounded-3xl' // aproximado de 30px
    },
    lg: {
      width: 'w-96', // 384px
      height: 'h-12', // 48px
      padding: 'px-6 py-3',
      text: 'text-lg', // 18px
      radius: 'rounded-3xl'
    }
  }

  const currentSize = sizeClasses[size]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${currentSize.width}
        ${currentSize.height}
        ${currentSize.padding}
        ${currentSize.radius}
        ${expanded ? 'font-mosvita-expanded' : 'font-mosvita'}
        ${currentSize.text}
        font-medium
        uppercase
        leading-none
        tracking-normal
        text-center
        flex items-center justify-center gap-2.5
        transition-all duration-200
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:opacity-90 active:scale-95 cursor-pointer'
        }
        ${className}
      `}
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      {/* Ícone SVG */}
      {icon && <span className="flex-shrink-0">{icon}</span>}

      {/* Texto do botão */}
      <span className="flex-1">{children}</span>
    </button>
  )
}

export default Button

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- children (React.ReactNode) - O texto do botão

PROPS OPCIONAIS (com valores padrão):
- icon?: React.ReactNode - SVG ou ícone antes do texto
- bgColor?: string (padrão: '#D9FF85')
- textColor?: string (padrão: '#000000')
- size?: 'sm' | 'md' | 'lg' (padrão: 'md')
- expanded?: boolean (padrão: false) - Usa versão expandida da fonte
- disabled?: boolean (padrão: false)
- onClick?: () => void - Função de clique
- className?: string (padrão: '')

EXEMPLOS:

// Botão básico
<Button onClick={() => alert('Clicou!')}>
  Meu botão
</Button>

// Com ícone
const PlayIcon = <svg>...</svg>
<Button icon={PlayIcon}>
  Reproduzir
</Button>

// Cores customizadas
<Button bgColor="#3b82f6" textColor="#ffffff">
  Botão azul
</Button>

// Tamanho grande
<Button size="lg" bgColor="#10b981" textColor="#ffffff">
  Botão grande
</Button>

// Expandido e desabilitado
<Button expanded disabled>
  Botão desabilitado
</Button>

// Exemplo completo
<Button
  icon={<svg>...</svg>}
  bgColor="#ec4899"
  textColor="#ffffff"
  size="lg"
  expanded
  onClick={() => console.log('Clicked!')}
  className="mx-auto"
>
  Botão completo
</Button>
*/
