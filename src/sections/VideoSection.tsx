import React from 'react'
import Title from '@ui/Title'
import VideoPlayer from '@ui/VideoModal'

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnail,
  sectionTitle
}) => {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Title as="h1" align="center">
            {sectionTitle}
          </Title>
        </div>

        <div className="w-full">
          <VideoPlayer
            videoSrc={videoSrc}
            thumbnail={thumbnail}
            className="max-w-4xl mx-auto"
            aspectRatio="1:1"
            isPlaying={false}
            isMuted={true}
            showControls={true}
          />
        </div>
      </div>
    </section>
  )
}

export default VideoSection
