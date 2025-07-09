import { ReactNode } from 'react'
import {
  IconType,
  TextAlign,
  TextSize,
  TitleSize,
  HeadingTag,
  TextTag,
  Leading,
  ButtonSize
} from './common'
import { CardListItem } from './card'

// Props para componentes de interface
export interface AccordionProps {
  allowMultipleOpen?: boolean
  items: {
    title: string
    icon?: ReactNode
    content: ReactNode
    backgroundColor?: string
    titleColor?: string
    contentColor?: string
    hoverColor?: string
  }[]
}

export interface AccordionItemProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  index: number
  openIndex: number | null
  setOpenIndex: (index: number | null) => void
  backgroundColor?: string
  titleColor?: string
  contentColor?: string
  /** Cor de fundo do hover (classe Tailwind) */
  hoverColor?: string
}

export interface ButtonProps {
  children: ReactNode
  icon?: ReactNode
  bgColor?: string
  textColor?: string
  size?: ButtonSize
  expanded?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export interface CardListProps {
  items: CardListItem[]
  className?: string
}

export interface IconProps {
  type: IconType
  className?: string
  color?: string
}

export interface TextProps {
  children: ReactNode
  as?: TextTag
  color?: string
  bulletColor?: string
  uppercase?: boolean
  lowercase?: boolean
  size?: TextSize
  align?: TextAlign
  expanded?: boolean
  leading?: Leading
  className?: string
}

export interface TitleProps {
  children: ReactNode
  as?: HeadingTag
  color?: string
  uppercase?: boolean
  lowercase?: boolean
  bold?: boolean
  size?: TitleSize
  align?: TextAlign
  expanded?: boolean
  className?: string
}
