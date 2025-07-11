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

// Tipos de variação
export type Variant = 'dark' | 'light'
export type Spacing = 'default' | 'sm' | 'md' | 'lg' | 'xl'
export type TextAlign = 'left' | 'center' | 'right'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'span'
export type TextTag = 'p' | 'span' | 'li'
export type AspectRatio = '1:1' | '16:9' | '9:16'
export type Position =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'top-center'
  | 'center'

export type Leading =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose'
  | string

export type IconType =
  | 'x'
  | 'check'
  | 'play'
  | 'smile'
  | 'heart'
  | 'flag'
  | 'brain'
  | 'eye'
  | 'chess'
  | 'pencil-ruler'
  | 'color-picker'
  | 'letter-spacing'
  | 'classify'
  | 'ai'
  | 'box'
  | 'certificate'
  | 'certificate2'
  | 'arrow'
  | 'phone'

export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
export type InputVariant = 'default' | 'larger'
