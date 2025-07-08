// src/components/VideoCarouselSection.tsx
import React from 'react'
import Title from '@ui/Title' // Assuming @ui/Title is a valid path to your Title component
import VideoCarouselModal from '@/components/VideoCarousel' // This should be your carousel component

interface Video {
  id: number
  src: string
  thumbnailSrc?: string
  title?: string
}

interface VideoCarouselSectionProps {
  videos: Video[]

  sectionTitle?: string
  titleColor?: string
}

const VideoCarouselSection: React.FC<VideoCarouselSectionProps> = ({
  videos,
  sectionTitle = 'Sua marca opera por acaso ou por intenção?',
  titleColor = '#ffffff'
}) => {
  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16`}>
      {/* Título principal */}
      <div className="text-center mb-8">
        <Title as="h2" size="lg" align="center" color={titleColor}>
          <span className="font-semibold">{sectionTitle}</span>
        </Title>
      </div>
      <div className="w-full">
        <VideoCarouselModal videos={videos} />
      </div>
    </section>
  )
}

export default VideoCarouselSection
