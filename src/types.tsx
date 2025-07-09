interface CardListItem {
  id: string
  icon: React.ReactNode
  text: string
}

interface BrandIntentionSectionProps {
  sectionTitle: React.ReactNode
  listItems?: CardListItem[]
}

interface CardData {
  variant: 'dark' | 'light'
  iconType: 'x' | 'check'
  title: string
  text: string
  listItems: string[]
}

interface ChooseSectionProps {
  className?: string
  sectionTitle: React.ReactNode
  cardsData: CardData[]
}

interface SectionDiffProps {
  className?: string
  sectionTitle: string | React.ReactNode
  cardDarkTitle: string
  cardDarkListItems: string[]
  cardDarkDescription: React.ReactNode
  cardLightTitle: string
  cardLightListItems: string[]
  cardLightDescription: React.ReactNode
}

interface HeroProps {
  heroImage?: string
  statsImage?: string
  className?: string
  sectionTitle: React.ReactNode
  descriptionText: string
}

interface ImageItem {
  id: number | string
  src: string
  alt: string
  title?: string
}

interface CarouselData {
  id: string
  images: ImageItem[]
  showModal?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

interface ImageCarouselSectionProps {
  sectionTitle: React.ReactNode
  carousels: CarouselData[]
  sectionClassName?: string
  spacing?: 'default' | 'sm' | 'md' | 'lg' | 'xl'
}

interface ProcessStepsSectionProps {
  sectionTitle: React.ReactNode
  descriptionText: string
  timelineItems: string[]
  className?: string
}

interface Video {
  id: number
  src: string
  thumbnailSrc?: string
  title?: string
}

interface VideoCarouselSectionProps {
  videos: Video[]

  titleColor?: string
  sectionTitle: React.ReactNode
}

interface VideoSectionProps {
  videoSrc: string
  thumbnail: string
  sectionTitle: React.ReactNode
}

interface AccordionProps {
  allowMultipleOpen?: boolean
  items: {
    title: string
    icon?: React.ReactNode
    content: React.ReactNode
    backgroundColor?: string
    titleColor?: string
    contentColor?: string
    hoverColor?: string
  }[]
}

interface CardProps {
  icon?: React.ReactNode
  title: string
  text?: string | React.ReactNode
  listItems?: string[]
  description?: string | React.ReactNode
  children?: React.ReactNode
  className?: string
  variant?: 'dark' | 'light'
}

interface Video {
  id: number
  src: string
  thumbnailSrc?: string
  title?: string
}

interface ImageItem {
  id: number | string
  src: string
  alt: string
  title?: string
}

interface ImageCarouselProps {
  images: ImageItem[]
  showModal?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

interface ImageModalProps {
  imageSrc: string
  imageAlt?: string
  imageTitle?: string
  triggerElement?: React.ReactNode
  className?: string
}

interface IconProps {
  type: 'x' | 'check' | 'play' | 'smile' | 'heart' | 'flag' | 'brain' | 'eye'
  className?: string
  color?: string
}

interface TextProps {
  children: React.ReactNode
  as?: 'p' | 'span' | 'li'
  color?: string
  bulletColor?: string
  uppercase?: boolean
  lowercase?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'left' | 'center' | 'right'
  expanded?: boolean
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' | string // Permite strings para valores arbitráios como 'leading-[1.75]'
  className?: string
}

interface TitleProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span'
  color?: string
  uppercase?: boolean
  lowercase?: boolean
  bold?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'left' | 'center' | 'right'
  expanded?: boolean
  className?: string
}

interface VideoPlayerProps {
  videoSrc: string
  title?: string
  className?: string
  thumbnail?: string
  aspectRatio?: '1:1' | '16:9' | '9:16'
  isPlaying: boolean
  isMuted: boolean
  showControls: boolean
  onLoadStart?: () => void
  onCanPlayThrough?: () => void
  onError?: () => void
  showPlayOverlay?: boolean
}
