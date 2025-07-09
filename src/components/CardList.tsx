import { CardListProps } from '@/types/ui'
import React from 'react'

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
          <li key={item.id} className="flex items-start gap-4">
            {/* Ícone SVG */}
            <div className="w-8 flex-shrink-0 pt-1.5">{item.icon}</div>
            {/* Texto */}
            <span
              className="font-mosvita text-base font-medium leading-normal tracking-normal whitespace-pre-line"
              style={{
                color: 'rgba(255, 255, 255, 0.6)'
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
