import { ReactNode } from 'react'

// Tipos para layout e estrutura
export interface Section {
  id: string
  content: ReactNode
}

export interface MainLayoutProps {
  sections?: Section[]
  children?: ReactNode
}

// Tipos para componentes de timeline
export interface TimelineColors {
  activeCircle: string
  inactiveCircle: string
  activeLine: string
  inactiveLine: string
  activeText: string
  inactiveText: string
}

export interface TimelineListProps {
  items: string[]
  colors?: TimelineColors
  threshold?: number
  rootMargin?: string
}
