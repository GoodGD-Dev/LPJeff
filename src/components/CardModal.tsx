import React from 'react'
import Title from '@ui/Title' // Importe seus componentes
import Text from '@ui/Text'

interface CardProps {
  icon?: React.ReactNode
  title: string
  listItems?: string[]
  description?: string | React.ReactNode
  children?: React.ReactNode
  className?: string
  variant?: 'dark' | 'light'
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  listItems = [],
  description,
  children,
  className = '',
  variant = 'dark'
}) => {
  // Definindo as cores baseadas na variação
  const variants = {
    dark: {
      cardBg: '#202020',
      cardBorder: '#2C2C2C',
      titleColor: '#FFFFFF',
      textColor: 'rgba(255, 255, 255, 0.6)', // Branco 60% opacidade
      iconColor: 'text-white'
    },
    light: {
      cardBg: '#D9FF85',
      cardBorder: '#D9FF85',
      titleColor: '#191919',
      textColor: 'rgba(25, 25, 25, 0.6)', // Preto 60% opacidade
      iconColor: 'text-black'
    }
  }

  const currentVariant = variants[variant]

  return (
    <div
      className={`border rounded-2xl p-8 space-y-6 ${className}`}
      style={{
        width: '343px',
        minHeight: '280px',
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
- listItems?: string[] - Array de itens para lista
- description?: string - Parágrafo de descrição
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

// Card dark (padrão)
<Card title="Card Escuro" />

// Card light
<Card
  title="Card Claro"
  variant="light"
/>

// Card completo dark
<Card
  icon={<svg>...</svg>}
  title="Card Completo"
  variant="dark"
  listItems={[
    "Primeiro item",
    "Segundo item",
    "Terceiro item"
  ]}
  description="Descrição final"
/>

// Card light com conteúdo customizado
<Card
  title="Card Personalizado"
  variant="light"
>
  <div>Conteúdo customizado</div>
</Card>
*/
