import { ButtonProps } from '@/types/ui'
import React, { useState, useEffect } from 'react'

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  bgColor = '#D9FF85',
  textColor = '#000000',
  size = 'md',
  expanded = false,
  disabled = false,
  onClick,
  className = '',
  targetSection,
  fixed = false,
  position = 'bottom-right',
  hideOnSection = false
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!hideOnSection || !targetSection || !fixed) return

    const handleScroll = () => {
      const targetElement = document.getElementById(targetSection)
      if (!targetElement) return

      const rect = targetElement.getBoundingClientRect()
      const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0
      setIsVisible(!isInViewport)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Executa uma vez para verificar estado inicial

    return () => window.removeEventListener('scroll', handleScroll)
  }, [hideOnSection, targetSection, fixed])

  // Mapeamento de tamanhos
  const sizeClasses = {
    xs: {
      width: 'w-56', // 224px
      height: 'h-8', // 32px
      padding: 'px-2 py-1.5',
      text: 'text-xs', // 12px
      radius: 'rounded-2xl'
    },
    sm: {
      width: 'w-64', // 256px
      height: 'h-9', // 36px
      padding: 'px-3 py-2',
      text: 'text-sm', // 14px
      radius: 'rounded-2xl'
    },
    md: {
      width: 'w-80', // 320px
      height: 'h-11', // 44px
      padding: 'px-4 py-2.5',
      text: 'text-base', // 16px
      radius: 'rounded-3xl' // 30px
    },
    lg: {
      width: 'w-96', // 384px
      height: 'h-12', // 48px
      padding: 'px-6 py-3',
      text: 'text-lg', // 18px
      radius: 'rounded-3xl'
    },
    xl: {
      width: 'w-112', // 448px (ou use w-[28rem])
      height: 'h-14', // 56px
      padding: 'px-8 py-3.5',
      text: 'text-xl', // 20px
      radius: 'rounded-3xl'
    }
  }

  // Mapeamento de posições para botões fixos
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
    'top-center': 'top-6 left-1/2 transform -translate-x-1/2',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  }

  const currentSize = sizeClasses[size]

  // Função para navegar para uma seção
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (targetSection) {
      const element = document.getElementById(targetSection)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    // Chama o onClick personalizado se fornecido
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${currentSize.width}
        ${currentSize.height}
        ${currentSize.padding}
        ${currentSize.radius}
        ${expanded ? 'font-mosvita-expanded' : 'font-mosvita'}
        ${currentSize.text}
        font-medium
        leading-none
        tracking-normal
        flex items-center justify-center
        transition-all duration-300
        ${fixed ? 'fixed z-50' : ''}
        ${fixed ? positionClasses[position] : ''}
        ${fixed && hideOnSection ? (isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none') : ''}
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
      {/* Container interno para centralizar SVG e texto */}
      <div className="flex items-center justify-center gap-2">
        {/* Ícone SVG */}
        {icon && <span className="flex-shrink-0 w-6 h-6">{icon}</span>}
        {/* Texto do botão */}
        <span>{children}</span>
      </div>
    </button>
  )
}

export default Button
