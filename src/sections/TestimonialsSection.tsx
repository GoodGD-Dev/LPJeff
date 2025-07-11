import React from 'react'
import Title from '@ui/Title'
import VideoCarouselModal from '@/components/VideoCarousel'
import { TestimonialsProps } from '@/types'

const Testimonials: React.FC<TestimonialsProps> = ({
  videos,
  sectionTitle
}) => {
  return (
    <>
      {/* Título principal */}
      <div>
        <Title>{sectionTitle}</Title>
      </div>

      <div className="w-full">
        <VideoCarouselModal videos={videos} />
      </div>
    </>
  )
}

export default Testimonials
