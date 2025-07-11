import { ReactNode } from 'react'

// Interfaces de dados de layout
export interface Section {
  id: string
  content: ReactNode
}

export interface TimelineColors {
  activeCircle: string
  inactiveCircle: string
  activeLine: string
  inactiveLine: string
  activeText: string
  inactiveText: string
}

export interface AccordionItem {
  title: string
  icon?: ReactNode
  content: ReactNode
  backgroundColor?: string
  titleColor?: string
  contentColor?: string
  hoverColor?: string
}

// Props para componentes de layout
export interface MainLayoutProps {
  sections?: Section[]
  children?: ReactNode
}

export interface TimelineListProps {
  items: string[]
  colors?: TimelineColors
  threshold?: number
  rootMargin?: string
}
