import { ReactNode } from 'react'
import { AspectRatio } from './common'

// Interfaces de dados de mídia
export interface ImageItem {
  id: number | string
  src: string
  alt: string
  title?: string
}

export interface Video {
  id: number
  src: string
  thumbnailSrc?: string
  title?: string
}

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
  triggerElement?: ReactNode
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
