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
  openBackgroundColor?: string
  iconColor?: string
  openTitleColor?: string
  openContentColor?: string
  titleColor?: string
  contentColor?: string
  hoverColor?: string
}

export interface ButtonProps {
  children?: React.ReactNode
  icon?: React.ReactNode
  bgColor?: string
  textColor?: string
  size?: 'sm' | 'md' | 'lg'
  expanded?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  targetSection?: string // ID da seção para navegar
  fixed?: boolean // Se o botão deve ser fixo
  position?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'bottom-center'
    | 'top-center'
    | 'center'

  hideOnSection?: boolean // Se deve ocultar quando estiver na seção de destino
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
