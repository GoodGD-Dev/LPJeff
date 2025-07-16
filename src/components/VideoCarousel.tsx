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

// VideoPlayer ultra-otimizado com correções para Firefox/Safari
const VideoPlayer: React.FC<{
  video: Video
  isActive: boolean
  onVideoReady?: () => void
}> = ({ video, isActive, onVideoReady }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Controle de reprodução otimizado com melhor suporte para Safari/Firefox
  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    if (isActive && canPlay) {
      videoEl.muted = false
      // Delay para Safari processar o unmute
      setTimeout(() => {
        if (videoEl.paused) {
          videoEl.play().catch(() => {
            // Fallback para Safari que pode bloquear autoplay
            videoEl.muted = true
            videoEl.play().catch(() => {})
          })
        }
      }, 100)
    } else {
      videoEl.muted = true
      videoEl.pause()
      videoEl.currentTime = 0
      setIsPlaying(false)
      setShowThumbnail(true)
    }
  }, [isActive, canPlay])

  // Handler para quando o vídeo pode ser reproduzido
  const handleCanPlay = useCallback(() => {
    setCanPlay(true)
  }, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    setShowThumbnail(false)
    onVideoReady?.()
  }, [onVideoReady])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const handleThumbnailClick = useCallback(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    setShowThumbnail(false)
    // Garantir que o vídeo está mutado no Safari para permitir autoplay
    videoEl.muted = true
    videoEl.play().catch(() => {})
  }, [])

  const togglePlay = useCallback(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    if (isPlaying) {
      videoEl.pause()
    } else {
      // Para Safari, garantir que está mutado se não for o vídeo ativo
      if (!isActive) {
        videoEl.muted = true
      }
      videoEl.play().catch(() => {})
    }
  }, [isPlaying, isActive])

  return (
    <div
      className="relative w-full h-full bg-black rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
      style={{
        // Melhor suporte para transforms no Firefox/Safari
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePlay}
    >
      {/* Thumbnail overlay */}
      {showThumbnail && video.thumbnailSrc && (
        <div className="absolute inset-0 z-10">
          <img
            src={video.thumbnailSrc}
            alt="thumbnail"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              // Melhor rendering no Safari
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300">
            <div
              className="transform transition-transform duration-300 hover:scale-110"
              onClick={handleThumbnailClick}
            >
              <svg width="80" height="80" viewBox="0 0 61 61" fill="#D9FF85">
                <path d="M30.5 5.89868C44.3075 5.89868 55.5 17.0912 55.5 30.8987C55.5 44.7062 44.3075 55.8987 30.5 55.8987C16.6925 55.8987 5.49998 44.7062 5.49998 30.8987C5.49998 17.0912 16.6925 5.89868 30.5 5.89868ZM30.5 10.8987C25.1957 10.8987 20.1086 13.0058 16.3579 16.7565C12.6071 20.5073 10.5 25.5944 10.5 30.8987C10.5 36.203 12.6071 41.2901 16.3579 45.0408C20.1086 48.7916 25.1957 50.8987 30.5 50.8987C35.8043 50.8987 40.8914 48.7916 44.6421 45.0408C48.3929 41.2901 50.5 36.203 50.5 30.8987C50.5 25.5944 48.3929 20.5073 44.6421 16.7565C40.8914 13.0058 35.8043 10.8987 30.5 10.8987ZM22.91 22.5237C22.9653 22.0638 23.127 21.6231 23.3823 21.2366C23.6377 20.8501 23.9796 20.5284 24.381 20.2971C24.7823 20.0659 25.2321 19.9314 25.6945 19.9043C26.157 19.8772 26.6194 19.9583 27.045 20.1412L27.8575 20.4987L28.9575 21.0037L29.83 21.4262L30.805 21.9162L31.88 22.4737L33.035 23.1012L34.27 23.8012L34.8925 24.1637L36.065 24.8687L37.135 25.5387L38.545 26.4587L39.705 27.2537L40.8425 28.0737L41.05 28.2262C42.6375 29.4187 42.65 31.7987 41.0525 32.9987L40.345 33.5212L39.3625 34.2112L38.1225 35.0487L37.155 35.6737L36.08 36.3487L34.8975 37.0562C34.6925 37.1779 34.4825 37.3004 34.2675 37.4237L33.0225 38.1287L31.8575 38.7612L30.7825 39.3212L29.8075 39.8112L28.545 40.4162L27.545 40.8687L27.04 41.0887C26.6146 41.2701 26.1527 41.35 25.6911 41.3221C25.2294 41.2941 24.7806 41.1591 24.3802 40.9277C23.9797 40.6963 23.6387 40.3749 23.3839 39.9889C23.1292 39.6029 22.9678 39.1629 22.9125 38.7037L22.7775 37.4562L22.7025 36.6212L22.5975 35.1237L22.5375 33.9737L22.4925 32.7087L22.4675 31.3362V29.8887L22.4925 28.5187L22.5375 27.2537L22.5975 26.1037L22.7025 24.6062L22.88 22.7812L22.91 22.5237ZM27.62 25.9112L27.5525 27.0787L27.5 28.3912L27.47 29.8412V31.3862L27.5 32.8362L27.55 34.1487L27.62 35.3162L28.66 34.7912L29.225 34.4962L30.445 33.8412L31.77 33.0937L33.075 32.3212L33.68 31.9512L34.79 31.2512L35.765 30.6137L34.785 29.9712L33.675 29.2687L32.435 28.5187C31.7799 28.1312 31.119 27.7536 30.4525 27.3862L29.2325 26.7312L28.1275 26.1637L27.62 25.9112Z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Video element com configurações otimizadas para Safari/Firefox */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={video.src}
        onPlay={handlePlay}
        onPause={handlePause}
        onCanPlay={handleCanPlay}
        onLoadedData={handleCanPlay}
        loop
        playsInline
        muted={!isActive}
        preload="metadata"
        style={{
          // Melhor rendering no Safari/Firefox
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)'
        }}
        // Atributos específicos para Safari
        webkit-playsinline="true"
        x5-playsinline="true"
      />

      {/* Play/Pause overlay - apenas quando pausado */}
      {!showThumbnail && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="transform transition-transform duration-300 hover:scale-110">
            <svg width="80" height="80" viewBox="0 0 61 61" fill="#D9FF85">
              <path d="M30.5 5.89868C44.3075 5.89868 55.5 17.0912 55.5 30.8987C55.5 44.7062 44.3075 55.8987 30.5 55.8987C16.6925 55.8987 5.49998 44.7062 5.49998 30.8987C5.49998 17.0912 16.6925 5.89868 30.5 5.89868ZM30.5 10.8987C25.1957 10.8987 20.1086 13.0058 16.3579 16.7565C12.6071 20.5073 10.5 25.5944 10.5 30.8987C10.5 36.203 12.6071 41.2901 16.3579 45.0408C20.1086 48.7916 25.1957 50.8987 30.5 50.8987C35.8043 50.8987 40.8914 48.7916 44.6421 45.0408C48.3929 41.2901 50.5 36.203 50.5 30.8987C50.5 25.5944 48.3929 20.5073 44.6421 16.7565C40.8914 13.0058 35.8043 10.8987 30.5 10.8987ZM22.91 22.5237C22.9653 22.0638 23.127 21.6231 23.3823 21.2366C23.6377 20.8501 23.9796 20.5284 24.381 20.2971C24.7823 20.0659 25.2321 19.9314 25.6945 19.9043C26.157 19.8772 26.6194 19.9583 27.045 20.1412L27.8575 20.4987L28.9575 21.0037L29.83 21.4262L30.805 21.9162L31.88 22.4737L33.035 23.1012L34.27 23.8012L34.8925 24.1637L36.065 24.8687L37.135 25.5387L38.545 26.4587L39.705 27.2537L40.8425 28.0737L41.05 28.2262C42.6375 29.4187 42.65 31.7987 41.0525 32.9987L40.345 33.5212L39.3625 34.2112L38.1225 35.0487L37.155 35.6737L36.08 36.3487L34.8975 37.0562C34.6925 37.1779 34.4825 37.3004 34.2675 37.4237L33.0225 38.1287L31.8575 38.7612L30.7825 39.3212L29.8075 39.8112L28.545 40.4162L27.545 40.8687L27.04 41.0887C26.6146 41.2701 26.1527 41.35 25.6911 41.3221C25.2294 41.2941 24.7806 41.1591 24.3802 40.9277C23.9797 40.6963 23.6387 40.3749 23.3839 39.9889C23.1292 39.6029 22.9678 39.1629 22.9125 38.7037L22.7775 37.4562L22.7025 36.6212L22.5975 35.1237L22.5375 33.9737L22.4925 32.7087L22.4675 31.3362V29.8887L22.4925 28.5187L22.5375 27.2537L22.5975 26.1037L22.7025 24.6062L22.88 22.7812L22.91 22.5237ZM27.62 25.9112L27.5525 27.0787L27.5 28.3912L27.47 29.8412V31.3862L27.5 32.8362L27.55 34.1487L27.62 35.3162L28.66 34.7912L29.225 34.4962L30.445 33.8412L31.77 33.0937L33.075 32.3212L33.68 31.9512L34.79 31.2512L35.765 30.6137L34.785 29.9712L33.675 29.2687L32.435 28.5187C31.7799 28.1312 31.119 27.7536 30.4525 27.3862L29.2325 26.7312L28.1275 26.1637L27.62 25.9112Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Controles de hover para desktop */}
      {isActive && !showThumbnail && isHovered && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-70 rounded-lg p-2 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            className="w-10 h-10 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#D9FF85">
              {isPlaying ? (
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-white text-xs">
              {isPlaying ? 'Reproduzindo' : 'Pausado'}
            </span>
          </div>
        </div>
      )}

      {/* Title */}
      {video.title && (
        <div className="absolute top-4 left-4 right-4">
          <p className="text-white text-sm font-medium bg-black bg-opacity-70 px-3 py-2 rounded-lg truncate">
            {video.title}
          </p>
        </div>
      )}
    </div>
  )
}

// Carousel otimizado para desktop e mobile com correções Firefox/Safari
const VideoCarouselModal: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<number>(0)
  const touchEnd = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchEndY = useRef<number>(0)

  // Detectar mobile de forma mais robusta
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Navegação com teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate('prev')
      } else if (e.key === 'ArrowRight') {
        navigate('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Navegação com throttle melhorado
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

      // Timeout maior para Firefox/Safari processar melhor
      setTimeout(() => setIsTransitioning(false), 400)
    },
    [videos.length, isTransitioning]
  )

  // Touch handlers otimizados para Firefox/Safari mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevenir scroll vertical se o movimento for principalmente horizontal
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const diffX = Math.abs(currentX - touchStart.current)
    const diffY = Math.abs(currentY - touchStartY.current)

    if (diffX > diffY) {
      e.preventDefault()
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEnd.current = e.changedTouches[0].clientX
      touchEndY.current = e.changedTouches[0].clientY

      const diffX = touchStart.current - touchEnd.current
      const diffY = touchStartY.current - touchEndY.current
      const threshold = 50

      // Só navegar se o movimento for principalmente horizontal
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          navigate('next')
        } else {
          navigate('prev')
        }
      }
    },
    [navigate]
  )

  // Renderizar slides com melhor suporte para Firefox/Safari
  const renderSlides = () => {
    const slides = []
    const total = videos.length

    if (isMobile) {
      // Comportamento mobile - apenas 3 slides (prev, current, next)
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
              WebkitTransform: `translateX(${-50 + i * 110}%) scale(${isActive ? 1 : 0.8})`,
              opacity: isActive ? 1 : 0.6,
              zIndex: isActive ? 20 : 10,
              width: '180px',
              height: '320px',
              // Melhor suporte para transforms no Firefox/Safari
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              WebkitPerspective: 1000,
              perspective: 1000
            }}
          >
            <VideoPlayer video={video} isActive={isActive} />
          </div>
        )
      }
    } else {
      // Comportamento desktop - múltiplos slides visíveis
      for (let i = -2; i <= 2; i++) {
        const index = (currentIndex + i + total) % total
        const video = videos[index]
        const isActive = i === 0

        slides.push(
          <div
            key={`${video.id}-${index}`}
            className="absolute top-0 transition-all duration-300 ease-out"
            style={{
              left: '50%',
              transform: `translateX(${-50 + i * 85}%) scale(${isActive ? 1 : 0.8})`,
              WebkitTransform: `translateX(${-50 + i * 85}%) scale(${isActive ? 1 : 0.8})`,
              opacity: isActive ? 1 : 0.6,
              zIndex: isActive ? 20 : 10 - Math.abs(i),
              width: '280px',
              height: '500px',
              // Melhor suporte para transforms no Firefox/Safari
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              WebkitPerspective: 1000,
              perspective: 1000
            }}
          >
            <VideoPlayer video={video} isActive={isActive} />
          </div>
        )
      }
    }

    return slides
  }

  return (
    <div className="relative w-full max-w-sm md:max-w-6xl mx-auto py-4 md:py-8">
      {/* Container principal */}
      <div
        ref={containerRef}
        className="relative h-80 md:h-[560px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          // Melhor suporte para transforms e overflow no Firefox/Safari
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Navigation buttons - apenas no desktop */}
        <button
          onClick={() => navigate('prev')}
          disabled={isTransitioning}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-black bg-opacity-60 text-white rounded-full items-center justify-center disabled:opacity-30 hover:bg-opacity-80 transition-all duration-200 hover:scale-110"
        >
          <svg
            width="20"
            height="20"
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
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-black bg-opacity-60 text-white rounded-full items-center justify-center disabled:opacity-30 hover:bg-opacity-80 transition-all duration-200 hover:scale-110"
        >
          <svg
            width="20"
            height="20"
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

      {/* Indicadores de navegação para mobile */}
      {isMobile && (
        <div className="flex justify-center mt-4 space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-white' : 'bg-gray-400'
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Dica de navegação - adaptada para mobile/desktop */}
      <div className="text-center mt-4 text-gray-400 text-sm">
        {isMobile
          ? 'Deslize para navegar entre os vídeos'
          : 'Use as setas ← → do teclado para navegar'}
      </div>
    </div>
  )
}

export default VideoCarouselModal
