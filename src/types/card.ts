import { ReactNode } from 'react'
import { BaseItem, Variant, IconType } from './common'

// Interfaces de dados de cards
export interface CardListItem extends BaseItem {
  icon: ReactNode
  text: string
}

export interface CardData {
  variant: Variant
  iconType: IconType
  title: string
  text: string
  listItems: string[]
}

// Props para componentes de card
export interface CardProps {
  icon?: ReactNode
  title: string
  text?: string | ReactNode
  listItems?: string[]
  description?: string | ReactNode
  children?: ReactNode
  className?: string
  variant?: Variant
}

export interface CardListProps {
  items: CardListItem[]
  className?: string
}
