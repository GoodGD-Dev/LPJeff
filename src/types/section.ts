import { ReactNode } from 'react'
import { BaseSectionProps, Spacing } from './common'
import { CardListItem, CardData } from './card'
import { CarouselData, Video } from './media'
import { FormField } from './form'
import { ButtonProps } from './ui'
import { AccordionItem } from './layout'

// Props para seções específicas
export interface BenefitsProps extends BaseSectionProps {
  listItems?: CardListItem[]
}

export interface ComparisonProps extends BaseSectionProps {
  cardsData: CardData[]
}

export interface DifferenceProps extends BaseSectionProps {
  cardDarkTitle: string
  cardDarkListItems: string[]
  cardDarkDescription: ReactNode
  cardLightTitle: string
  cardLightListItems: string[]
  cardLightDescription: ReactNode
}

export interface HeroProps extends BaseSectionProps {
  heroImage?: string
  statsImage?: string
  descriptionText: string
}

export interface ExamplesProps extends BaseSectionProps {
  carousels: CarouselData[]
  sectionClassName?: string
  spacing?: Spacing
}

export interface StepsProps extends BaseSectionProps {
  descriptionText: string
  timelineItems: string[]
}

export interface TestimonialsProps extends BaseSectionProps {
  videos: Video[]
  titleColor?: string
}

export interface IntroProps extends BaseSectionProps {
  videoSrc: string
  thumbnail: string
}

export interface DeliverablesProps {
  className?: string
  sectionTitle: string | ReactNode
  descriptionText: string | ReactNode
  accordionItems: AccordionItem[]
}

export interface ContactProps {
  sectionTitle: string | ReactNode
  descriptionText: string
  fields: FormField[]
  submitButtonText: string
  onSubmit: (formData: Record<string, string>) => void
  formTitle?: string
  buttonProps?: Partial<ButtonProps>
  formChildren?: ReactNode
  className?: string
  formClassName?: string
  security?: string
}
