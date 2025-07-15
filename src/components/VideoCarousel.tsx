import React, { useState, useCallback, useRef, useEffect } from 'react'

// Types essenciais
interface Video {
  id: number
  src: string
  thumbnailSrc?: string
  title?: string
}

interface VideoCarouselProps {
  videos: Video[]
}

// VideoPlayer ultra-otimizado
const VideoPlayer: React.FC<{
  video: Video
  isActive: boolean
  onVideoReady?: () => void
}> = ({ video, isActive, onVideoReady }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Controle de reprodução otimizado
  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    if (isActive) {
      videoEl.muted = false
      if (videoEl.paused) {
        videoEl.play().catch(() => {})
      }
    } else {
      videoEl.muted = true
      videoEl.pause()
      videoEl.currentTime = 0
      setIsPlaying(false)
      setShowThumbnail(true)
    }
  }, [isActive])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    setShowThumbnail(false)
    onVideoReady?.()
  }, [onVideoReady])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const handleThumbnailClick = useCallback(() => {
    setShowThumbnail(false)
    videoRef.current?.play()
  }, [])

  const togglePlay = useCallback(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    if (isPlaying) {
      videoEl.pause()
    } else {
      videoEl.play()
    }
  }, [isPlaying])

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Thumbnail overlay */}
      {showThumbnail && video.thumbnailSrc && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleThumbnailClick}
        >
          <img
            src={video.thumbnailSrc}
            alt="thumbnail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={video.src}
        onPlay={handlePlay}
        onPause={handlePause}
        loop
        playsInline
        muted={!isActive}
        preload="none"
      />

      {/* Play/Pause overlay */}
      {!showThumbnail && !isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-20"
          onClick={togglePlay}
        >
          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Simple controls */}
      {isActive && !showThumbnail && (
        <div className="absolute bottom-2 left-2 right-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              {isPlaying ? (
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </button>
        </div>
      )}

      {/* Title */}
      {video.title && (
        <div className="absolute top-2 left-2 right-2">
          <p className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded truncate">
            {video.title}
          </p>
        </div>
      )}
    </div>
  )
}

// Carousel super otimizado
const VideoCarouselModal: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<number>(0)
  const touchEnd = useRef<number>(0)

  // Navegação com throttle
  const navigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (isTransitioning) return

      setIsTransitioning(true)

      setCurrentIndex((prev) => {
        if (direction === 'next') {
          return (prev + 1) % videos.length
        }
        return (prev - 1 + videos.length) % videos.length
      })

      // Usar setTimeout em vez de transitionend para ser mais previsível
      setTimeout(() => setIsTransitioning(false), 250)
    },
    [videos.length, isTransitioning]
  )

  // Touch handlers minimalistas
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEnd.current = e.changedTouches[0].clientX

      const diff = touchStart.current - touchEnd.current
      const threshold = 50

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          navigate('next')
        } else {
          navigate('prev')
        }
      }
    },
    [navigate]
  )

  // Renderizar apenas 3 slides (prev, current, next)
  const renderSlides = () => {
    const slides = []
    const total = videos.length

    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + total) % total
      const video = videos[index]
      const isActive = i === 0

      slides.push(
        <div
          key={`${video.id}-${index}`}
          className="absolute top-0 transition-all duration-300 ease-out"
          style={{
            left: '50%',
            transform: `translateX(${-50 + i * 110}%) scale(${isActive ? 1 : 0.8})`,
            opacity: isActive ? 1 : 0.6,
            zIndex: isActive ? 20 : 10,
            width: '180px',
            height: '320px'
          }}
        >
          <VideoPlayer video={video} isActive={isActive} />
        </div>
      )
    }

    return slides
  }

  return (
    <div className="relative w-full max-w-sm mx-auto py-4">
      {/* Container principal */}
      <div
        ref={containerRef}
        className="relative h-80 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation buttons */}
        <button
          onClick={() => navigate('prev')}
          disabled={isTransitioning}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center disabled:opacity-30"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={() => navigate('next')}
          disabled={isTransitioning}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center disabled:opacity-30"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Slides */}
        {renderSlides()}
      </div>

      {/* Indicators minimalistas */}
      <div className="flex justify-center space-x-1 mt-3">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentIndex(index)}
            disabled={isTransitioning}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white bg-opacity-40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default VideoCarouselModal
