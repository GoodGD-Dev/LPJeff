import React from 'react'
import Title from '@ui/Title'
import ImageCarousel from '@components/ImageCarousel'
import { ImageCarouselSectionProps } from '@/types'

const ImageCarouselSection: React.FC<ImageCarouselSectionProps> = ({
  sectionTitle,
  carousels,
  sectionClassName = '',
  spacing = 'default'
}) => {
  // Mapeamento de espaçamentos entre carousels
  const spacingClasses = {
    default: 'space-y-1', // 4px
    sm: 'space-y-8', // 32px
    md: 'space-y-12', // 48px
    lg: 'space-y-16', // 64px
    xl: 'space-y-20' // 80px
  }

  return (
    <>
      <div className="mb-8">
        <Title>{sectionTitle}</Title>
      </div>

      {/* Carousels */}
      <div className={`${spacingClasses[spacing]}`}>
        {carousels.map((carousel) => (
          <div key={carousel.id} className="w-full">
            <ImageCarousel
              images={carousel.images}
              showModal={carousel.showModal}
              autoPlay={carousel.autoPlay}
              autoPlayInterval={carousel.autoPlayInterval}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ImageCarouselSection
