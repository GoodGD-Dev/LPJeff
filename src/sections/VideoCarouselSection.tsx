import React from 'react'
import Title from '@ui/Title'
import VideoCarouselModal from '@/components/VideoCarousel'
import { VideoCarouselSectionProps } from '@/types'

const VideoCarouselSection: React.FC<VideoCarouselSectionProps> = ({
  videos,
  sectionTitle
}) => {
  return (
    <>
      {/* Título principal */}
      <div className="mb-8">
        <Title>{sectionTitle}</Title>
      </div>

      <div className="w-full">
        <VideoCarouselModal videos={videos} />
      </div>
    </>
  )
}

export default VideoCarouselSection
