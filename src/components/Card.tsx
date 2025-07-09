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

      {/* Título usando componente Title */}
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

        {/* Lista de itens usando componente Text */}
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

      {/* Descrição usando componente Text */}
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

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- title: string - Título do card

PROPS OPCIONAIS:
- icon?: React.ReactNode - SVG decorativo no topo esquerdo
- text?: string | React.ReactNode - Texto após o título (sem gap)
- listItems?: string[] - Array de itens para lista
- description?: string | React.ReactNode - Parágrafo de descrição
- children?: React.ReactNode - Conteúdo customizado
- className?: string - Classes CSS extras
- variant?: 'dark' | 'light' - Variação de cores (padrão: 'dark')

VARIAÇÕES:

DARK (padrão):
- Card: #202020
- Título: #FFFFFF
- Texto: rgba(255, 255, 255, 0.6)

LIGHT:
- Card: #D9FF85
- Título: #191919
- Texto: rgba(25, 25, 25, 0.6)

EXEMPLOS:

// Card com texto após título
<Card
  title="Título Principal"
  text="Este texto aparece logo após o título, sem gap entre eles"
/>

// Card completo com todas as props
<Card
  icon={<svg>...</svg>}
  title="Card Completo"
  text="Texto explicativo do card"
  listItems={[
    "Primeiro item",
    "Segundo item",
    "Terceiro item"
  ]}
  description="Descrição final do card"
  variant="dark"
/>

// Card light com texto
<Card
  title="Card Claro"
  text="Texto no card claro"
  variant="light"
/>

// Ordem dos elementos:
// 1. Ícone (se houver)
// 2. Título
// 3. Texto + Lista (sem gap entre eles)
// 4. Descrição (se houver)
// 5. Children (se houver)
*/
