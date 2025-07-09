import { BaseItem, AspectRatio } from './common'

// Tipos para imagens
export interface ImageItem extends BaseItem {
  src: string
  alt: string
  title?: string
}

// Tipos para vídeos
export interface Video extends BaseItem {
  src: string
  thumbnailSrc?: string
  title?: string
}

// Tipos para carrossel de imagens
export interface CarouselData {
  id: string
  images: ImageItem[]
  showModal?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

// Props para componentes de mídia
export interface ImageCarouselProps {
  images: ImageItem[]
  showModal?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

export interface ImageModalProps {
  imageSrc: string
  imageAlt?: string
  imageTitle?: string
  triggerElement?: React.ReactNode
  className?: string
}

export interface VideoPlayerProps {
  videoSrc: string
  title?: string
  className?: string
  thumbnail?: string
  aspectRatio?: AspectRatio
  isPlaying: boolean
  isMuted: boolean
  showControls: boolean
  onLoadStart?: () => void
  onCanPlayThrough?: () => void
  onError?: () => void
  showPlayOverlay?: boolean
}
