import React from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'
import { CardProps } from '@/types'

const Card: React.FC<CardProps> = ({
  icon,
  title,
  text,
  listItems = [],
  description,
  children,
  className = '',
  variant = 'dark'
}) => {
  const variantClasses = {
    dark: {
      cardBg: 'bg-secondary-light',
      cardBorder: 'border-border',
      titleColor: 'text-text',
      textColor: 'text-text-muted',
      iconColor: 'text-text'
    },
    light: {
      cardBg: 'bg-primary',
      cardBorder: 'border-primary',
      titleColor: 'text-secondary',
      textColor: 'text-[rgba(25,25,25,0.6)]',
      iconColor: 'text-black'
    }
  }

  const currentClasses = variantClasses[variant]

  return (
    <div
      className={`border rounded-2xl p-8 space-y-6
        w-full max-w-[343px] min-h-[280px]
        sm:w-[343px]
        ${currentClasses.cardBg}
        ${currentClasses.cardBorder}
        ${className}`}
    >
      {/* SVG */}
      {icon && (
        <div className={`${currentClasses.iconColor} w-6 h-6`}>{icon}</div>
      )}

      {/* Título */}
      <Title
        as="h2"
        size="sm"
        align="left"
        bold
        uppercase
        className={currentClasses.titleColor}
      >
        {title}
      </Title>

      {/* Text */}
      <div className="space-y-2">
        {text && (
          <Text as="p" align="left" className={currentClasses.textColor}>
            {text}
          </Text>
        )}

        {/* Lista de itens*/}
        {listItems.length > 0 && (
          <ul className="space-y-2">
            {listItems.map((item, index) => (
              <Text
                key={index}
                as="li"
                className={currentClasses.textColor}
                align="left"
              >
                {item}
              </Text>
            ))}
          </ul>
        )}
      </div>

      {/* Descrição*/}
      {description && (
        <Text
          as="p"
          align="left"
          // Aqui passamos a classe de cor para o componente Text
          className={currentClasses.textColor}
        >
          {description}
        </Text>
      )}

      {/* Conteúdo customizado */}
      {children && <div>{children}</div>}
    </div>
  )
}

export default Card
