import React from 'react'
import Title from '@ui/Title'
import VideoPlayer from '@ui/VideoModal'
import { IntroProps } from '@/types'

const Intro: React.FC<IntroProps> = ({ videoSrc, thumbnail, sectionTitle }) => {
  return (
    <>
      <div className="mb-8">
        <Title>{sectionTitle}</Title>
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
    </>
  )
}

export default Intro
