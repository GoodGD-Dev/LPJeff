import React from 'react'
import Title from '@ui/Title'
import VideoCarouselModal from '@/components/VideoCarousel'

const VideoCarouselSection: React.FC<VideoCarouselSectionProps> = ({
  videos,
  sectionTitle
}) => {
  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16`}>
      {/* Título principal */}
      <div className="mb-8">
        <Title as="h1" align="center">
          {sectionTitle}
        </Title>
      </div>

      <div className="w-full">
        <VideoCarouselModal videos={videos} />
      </div>
    </section>
  )
}

export default VideoCarouselSection
