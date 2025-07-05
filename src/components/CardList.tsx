import React from 'react'

interface CardListItem {
  id: string
  icon: React.ReactNode
  text: string
}

interface CardListProps {
  items: CardListItem[]
  className?: string
}

const CardList: React.FC<CardListProps> = ({ items, className = '' }) => {
  return (
    <div
      className={`bg-[#202020] border border-[#2C2C2C] rounded-2xl p-8 space-y-6
  w-full max-w-[343px] min-h-[280px]
  sm:w-[343px]
  ${className}`}
    >
      {/* Lista de itens */}
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            {/* Ícone SVG */}
            <div className="text-white w-4 h-4 flex-shrink-0">{item.icon}</div>

            {/* Texto */}
            <span
              className="font-mosvita text-base font-medium leading-normal tracking-normal"
              style={{
                color: 'rgba(255, 255, 255, 0.6)' // Branco 60% transparência
              }}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardList

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- items: CardListItem[] - Array de itens da lista

PROPS OPCIONAIS:
- className?: string - Classes CSS extras

INTERFACE CardListItem:
- id: string - ID único do item
- icon: React.ReactNode - SVG do ícone
- text: string - Texto do item

EXEMPLOS:

// CardList básico
const items = [
  {
    id: '1',
    icon: <svg>...</svg>,
    text: 'Primeiro item'
  },
  {
    id: '2',
    icon: <svg>...</svg>,
    text: 'Segundo item'
  },
  // ... até 5 itens
]

<CardList items={items} />

// Com className
<CardList
  items={items}
  className="mx-auto"
/>

ESPECIFICAÇÕES:
- Dimensões: 343x335px
- Background: #202020
- Border: 1px solid #2C2C2C
- Border-radius: 16px
- Padding: 32px
- Gap entre itens: 24px (space-y-6)
- Gap ícone-texto: 16px (gap-4)
- Ícones: 16x16px
- Tipografia: Mosvita Medium 16px
- Cor texto: rgba(255, 255, 255, 0.6)
*/
