import React from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'

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
  const variants = {
    dark: {
      cardBg: '#202020',
      cardBorder: '#2C2C2C',
      titleColor: '#FFFFFF',
      textColor: 'rgba(255, 255, 255, 0.6)',
      iconColor: 'text-white'
    },
    light: {
      cardBg: '#D9FF85',
      cardBorder: '#D9FF85',
      titleColor: '#191919',
      textColor: 'rgba(25, 25, 25, 0.6)',
      iconColor: 'text-black'
    }
  }

  const currentVariant = variants[variant]

  return (
    <div
      className={`border rounded-2xl p-8 space-y-6
        w-full max-w-[343px] min-h-[280px]
        sm:w-[343px]
        ${className}`}
      style={{
        backgroundColor: currentVariant.cardBg,
        borderColor: currentVariant.cardBorder
      }}
    >
      {/* SVG decorativo no topo esquerdo */}
      {icon && (
        <div className={`${currentVariant.iconColor} w-6 h-6`}>{icon}</div>
      )}

      {/* Título */}
      <Title
        as="h2"
        size="sm"
        align="left"
        bold
        uppercase
        color={currentVariant.titleColor}
      >
        {title}
      </Title>

      {/* Text */}
      <div className="space-y-2">
        {text && (
          <Text as="p" align="left" color={currentVariant.textColor}>
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
                color={currentVariant.textColor}
                bulletColor={currentVariant.textColor}
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
        <Text as="p" align="left" color={currentVariant.textColor}>
          {description}
        </Text>
      )}

      {/* Conteúdo customizado */}
      {children && <div>{children}</div>}
    </div>
  )
}

export default Card
