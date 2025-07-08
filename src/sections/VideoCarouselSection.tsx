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
  videos: Video[] // This prop correctly passes the array of videos to this component
  // You can add other props here that you want to pass to this section
  sectionTitle?: string // Example of an additional prop for the section title
  titleColor?: string // Example of an additional prop for the title color
}

const VideoCarouselSection: React.FC<VideoCarouselSectionProps> = ({
  videos,
  sectionTitle = 'Sua marca opera por acaso ou por intenção?', // Default value for sectionTitle
  titleColor = '#ffffff' // Default value for titleColor
}) => {
  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16`}>
      {/* Título principal - now dynamically set by sectionTitle and titleColor */}
      <div className="text-center mb-8">
        <Title as="h1" size="lg" align="center" color={titleColor}>
          <span className="font-semibold">{sectionTitle}</span>
        </Title>
      </div>
      <div className="w-full">
        {/*
          IMPORTANT: VideoCarouselModal expects a 'videos' prop (an array of videos).
          It handles individual video properties (src, title, thumbnail, etc.) internally for each video in the array.
          Also, event handlers like onLoadStart, onCanPlayThrough, onError are typically handled
          within VideoCarouselModal for each video, not passed directly from here.
        */}
        <VideoCarouselModal videos={videos} />
      </div>
    </section>
  )
}

export default VideoCarouselSection
