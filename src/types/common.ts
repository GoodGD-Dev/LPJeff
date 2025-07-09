import { ReactNode } from 'react'

// Tipos base compartilhados
export interface BaseItem {
  id: string | number
}

export interface BaseProps {
  className?: string
}

export interface BaseSectionProps extends BaseProps {
  sectionTitle: ReactNode
}

// Tipos para variações de componentes
export type Variant = 'dark' | 'light'
export type IconType =
  | 'x'
  | 'check'
  | 'play'
  | 'smile'
  | 'heart'
  | 'flag'
  | 'brain'
  | 'eye'
export type Spacing = 'default' | 'sm' | 'md' | 'lg' | 'xl'
export type TextAlign = 'left' | 'center' | 'right'
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TitleSize = 'sm' | 'md' | 'lg' | 'xl'
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'span'
export type TextTag = 'p' | 'span' | 'li'
export type AspectRatio = '1:1' | '16:9' | '9:16'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type Leading =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose'
  | string
