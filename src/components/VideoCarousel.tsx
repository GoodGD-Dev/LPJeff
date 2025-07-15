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
            <svg width="60" height="60" viewBox="0 0 61 61" fill="#D9FF85">
              <path d="M30.5 5.89868C44.3075 5.89868 55.5 17.0912 55.5 30.8987C55.5 44.7062 44.3075 55.8987 30.5 55.8987C16.6925 55.8987 5.49998 44.7062 5.49998 30.8987C5.49998 17.0912 16.6925 5.89868 30.5 5.89868ZM30.5 10.8987C25.1957 10.8987 20.1086 13.0058 16.3579 16.7565C12.6071 20.5073 10.5 25.5944 10.5 30.8987C10.5 36.203 12.6071 41.2901 16.3579 45.0408C20.1086 48.7916 25.1957 50.8987 30.5 50.8987C35.8043 50.8987 40.8914 48.7916 44.6421 45.0408C48.3929 41.2901 50.5 36.203 50.5 30.8987C50.5 25.5944 48.3929 20.5073 44.6421 16.7565C40.8914 13.0058 35.8043 10.8987 30.5 10.8987ZM22.91 22.5237C22.9653 22.0638 23.127 21.6231 23.3823 21.2366C23.6377 20.8501 23.9796 20.5284 24.381 20.2971C24.7823 20.0659 25.2321 19.9314 25.6945 19.9043C26.157 19.8772 26.6194 19.9583 27.045 20.1412L27.8575 20.4987L28.9575 21.0037L29.83 21.4262L30.805 21.9162L31.88 22.4737L33.035 23.1012L34.27 23.8012L34.8925 24.1637L36.065 24.8687L37.135 25.5387L38.545 26.4587L39.705 27.2537L40.8425 28.0737L41.05 28.2262C42.6375 29.4187 42.65 31.7987 41.0525 32.9987L40.345 33.5212L39.3625 34.2112L38.1225 35.0487L37.155 35.6737L36.08 36.3487L34.8975 37.0562C34.6925 37.1779 34.4825 37.3004 34.2675 37.4237L33.0225 38.1287L31.8575 38.7612L30.7825 39.3212L29.8075 39.8112L28.545 40.4162L27.545 40.8687L27.04 41.0887C26.6146 41.2701 26.1527 41.35 25.6911 41.3221C25.2294 41.2941 24.7806 41.1591 24.3802 40.9277C23.9797 40.6963 23.6387 40.3749 23.3839 39.9889C23.1292 39.6029 22.9678 39.1629 22.9125 38.7037L22.7775 37.4562L22.7025 36.6212L22.5975 35.1237L22.5375 33.9737L22.4925 32.7087L22.4675 31.3362V29.8887L22.4925 28.5187L22.5375 27.2537L22.5975 26.1037L22.7025 24.6062L22.88 22.7812L22.91 22.5237ZM27.62 25.9112L27.5525 27.0787L27.5 28.3912L27.47 29.8412V31.3862L27.5 32.8362L27.55 34.1487L27.62 35.3162L28.66 34.7912L29.225 34.4962L30.445 33.8412L31.77 33.0937L33.075 32.3212L33.68 31.9512L34.79 31.2512L35.765 30.6137L34.785 29.9712L33.675 29.2687L32.435 28.5187C31.7799 28.1312 31.119 27.7536 30.4525 27.3862L29.2325 26.7312L28.1275 26.1637L27.62 25.9112Z" />
            </svg>
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
          <svg width="60" height="60" viewBox="0 0 61 61" fill="#D9FF85">
            <path d="M30.5 5.89868C44.3075 5.89868 55.5 17.0912 55.5 30.8987C55.5 44.7062 44.3075 55.8987 30.5 55.8987C16.6925 55.8987 5.49998 44.7062 5.49998 30.8987C5.49998 17.0912 16.6925 5.89868 30.5 5.89868ZM30.5 10.8987C25.1957 10.8987 20.1086 13.0058 16.3579 16.7565C12.6071 20.5073 10.5 25.5944 10.5 30.8987C10.5 36.203 12.6071 41.2901 16.3579 45.0408C20.1086 48.7916 25.1957 50.8987 30.5 50.8987C35.8043 50.8987 40.8914 48.7916 44.6421 45.0408C48.3929 41.2901 50.5 36.203 50.5 30.8987C50.5 25.5944 48.3929 20.5073 44.6421 16.7565C40.8914 13.0058 35.8043 10.8987 30.5 10.8987ZM22.91 22.5237C22.9653 22.0638 23.127 21.6231 23.3823 21.2366C23.6377 20.8501 23.9796 20.5284 24.381 20.2971C24.7823 20.0659 25.2321 19.9314 25.6945 19.9043C26.157 19.8772 26.6194 19.9583 27.045 20.1412L27.8575 20.4987L28.9575 21.0037L29.83 21.4262L30.805 21.9162L31.88 22.4737L33.035 23.1012L34.27 23.8012L34.8925 24.1637L36.065 24.8687L37.135 25.5387L38.545 26.4587L39.705 27.2537L40.8425 28.0737L41.05 28.2262C42.6375 29.4187 42.65 31.7987 41.0525 32.9987L40.345 33.5212L39.3625 34.2112L38.1225 35.0487L37.155 35.6737L36.08 36.3487L34.8975 37.0562C34.6925 37.1779 34.4825 37.3004 34.2675 37.4237L33.0225 38.1287L31.8575 38.7612L30.7825 39.3212L29.8075 39.8112L28.545 40.4162L27.545 40.8687L27.04 41.0887C26.6146 41.2701 26.1527 41.35 25.6911 41.3221C25.2294 41.2941 24.7806 41.1591 24.3802 40.9277C23.9797 40.6963 23.6387 40.3749 23.3839 39.9889C23.1292 39.6029 22.9678 39.1629 22.9125 38.7037L22.7775 37.4562L22.7025 36.6212L22.5975 35.1237L22.5375 33.9737L22.4925 32.7087L22.4675 31.3362V29.8887L22.4925 28.5187L22.5375 27.2537L22.5975 26.1037L22.7025 24.6062L22.88 22.7812L22.91 22.5237ZM27.62 25.9112L27.5525 27.0787L27.5 28.3912L27.47 29.8412V31.3862L27.5 32.8362L27.55 34.1487L27.62 35.3162L28.66 34.7912L29.225 34.4962L30.445 33.8412L31.77 33.0937L33.075 32.3212L33.68 31.9512L34.79 31.2512L35.765 30.6137L34.785 29.9712L33.675 29.2687L32.435 28.5187C31.7799 28.1312 31.119 27.7536 30.4525 27.3862L29.2325 26.7312L28.1275 26.1637L27.62 25.9112Z" />
          </svg>
        </div>
      )}

      {/* Simple controls */}
      {isActive && !showThumbnail && (
        <div className="absolute bottom-2 left-2 right-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D9FF85">
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
    </div>
  )
}

export default VideoCarouselModal
