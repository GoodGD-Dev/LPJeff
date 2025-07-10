import React from 'react'
import { CardListProps } from '@types'

const CardList: React.FC<CardListProps> = ({ items, className = '' }) => {
  return (
    <div
      className={`bg-secondary-light border border-border rounded-2xl p-8 space-y-6
  mx-auto
  ${className}`}
    >
      {/* Lista de itens */}
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-4">
            {/* Ícone SVG */}
            <div className="w-8 flex-shrink-0 pt-1.5">{item.icon}</div>
            {/* Texto */}
            <span className="text-text-muted font-mosvita text-base font-medium leading-normal tracking-normal whitespace-pre-line">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardList
