import { ReactNode } from 'react'
import { BaseSectionProps, Spacing } from './common'
import { CardListItem, CardData } from './card'
import { CarouselData, Video } from './media'

// Props para seções específicas
export interface BrandIntentionSectionProps extends BaseSectionProps {
  listItems?: CardListItem[]
}

export interface ChooseSectionProps extends BaseSectionProps {
  cardsData: CardData[]
}

export interface SectionDiffProps extends BaseSectionProps {
  sectionTitle: string | ReactNode
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

export interface ImageCarouselSectionProps extends BaseSectionProps {
  carousels: CarouselData[]
  sectionClassName?: string
  spacing?: Spacing
}

export interface ProcessStepsSectionProps extends BaseSectionProps {
  descriptionText: string
  timelineItems: string[]
}

export interface VideoCarouselSectionProps extends BaseSectionProps {
  videos: Video[]
  titleColor?: string
}

export interface VideoSectionProps extends BaseSectionProps {
  videoSrc: string
  thumbnail: string
}

export interface AccordionSectionProps {
  className?: string
  sectionTitle: string | ReactNode
  descriptionText: string | ReactNode
  accordionItems: Array<{
    title: string
    content: React.ReactNode
  }>
}
