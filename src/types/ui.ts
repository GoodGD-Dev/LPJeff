import { ReactNode } from 'react'
import {
  IconType,
  Size,
  ButtonSize,
  TextAlign,
  HeadingTag,
  TextTag,
  Leading,
  Position
} from './common'
import { AccordionItem } from './layout'

// Props para componentes básicos de UI
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
  size?: Size
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
  size?: Size
  align?: TextAlign
  expanded?: boolean
  className?: string
}

export interface ButtonProps {
  children?: ReactNode
  icon?: ReactNode
  bgColor?: string
  textColor?: string
  size?: ButtonSize
  expanded?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  targetSection?: string
  fixed?: boolean
  position?: Position
  hideOnSection?: boolean
}

// Props para componentes de accordion
export interface AccordionProps {
  allowMultipleOpen?: boolean
  items: AccordionItem[]
}

export interface AccordionItemProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  index: number
  openIndex: number | null
  setOpenIndex: (index: number | null) => void
  backgroundColor?: string
  openBackgroundColor?: string
  iconColor?: string
  openTitleColor?: string
  openContentColor?: string
  titleColor?: string
  contentColor?: string
  hoverColor?: string
}
