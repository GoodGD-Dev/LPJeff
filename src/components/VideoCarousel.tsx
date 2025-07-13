import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { Video } from '@types'
import { VideoModal } from '@ui'
import 'keen-slider/keen-slider.min.css'

interface VideoCarouselModalProps {
  videos: Video[]
}

interface VideoStatus {
  loading: boolean
  error: boolean
  preloaded: boolean
}

const VideoCarouselModal: React.FC<VideoCarouselModalProps> = ({ videos }) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0)
  const [videoStatus, setVideoStatus] = useState<Record<number, VideoStatus>>(
    {}
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  const preloadedVideos = useRef<Set<number>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)

  // Preload adjacent videos for smoother experience
  const preloadVideo = useCallback((videoId: number, src: string) => {
    if (preloadedVideos.current.has(videoId)) return

    const video = document.createElement('video')
    video.src = src
    video.preload = 'metadata'
    video.muted = true

    video.addEventListener('loadedmetadata', () => {
      preloadedVideos.current.add(videoId)
      setVideoStatus((prev) => ({
        ...prev,
        [`${videoId}`]: { ...prev[`${videoId}`], preloaded: true }
      }))
    })
  }, [])

  // Preload only visible videos (current, prev, next)
  useEffect(() => {
    const currentVideo =
      videos[(currentSlideIdx + videos.length) % videos.length]
    const nextVideo =
      videos[(currentSlideIdx + 1 + videos.length) % videos.length]
    const prevVideo =
      videos[(currentSlideIdx - 1 + videos.length) % videos.length]

    // Preload in order of priority
    if (currentVideo) preloadVideo(currentVideo.id, currentVideo.src)
    if (nextVideo) preloadVideo(nextVideo.id, nextVideo.src)
    if (prevVideo) preloadVideo(prevVideo.id, prevVideo.src)
  }, [currentSlideIdx, videos, preloadVideo])

  // Enhanced slider options with 3-slide layout (prev, current, next)
  const sliderOptions = useMemo(
    () => ({
      loop: true,
      mode: 'snap' as const,
      renderMode: 'performance' as const,
      dragSpeed: 1.2,
      rubberband: false,
      duration: 700,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      slides: {
        perView: 3,
        spacing: 30,
        origin: 'center' as const
      },
      breakpoints: {
        '(max-width: 767px)': {
          slides: {
            perView: 1.8,
            spacing: 5,
            origin: 'center' as const
          }
        }
      },
      initial: 0,
      slideChanged: (slider: any) => {
        setIsTransitioning(true)
        setCurrentSlideIdx(slider.track.details.rel)

        // Reset transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      },
      animationStarted: () => {
        setIsTransitioning(true)
      },
      animationEnded: () => {
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }
    }),
    []
  )

  const [sliderRef, slider] = useKeenSlider(sliderOptions)

  // Optimized handlers
  const handleLoadStart = useCallback((videoId: number) => {
    setVideoStatus((prev) => ({
      ...prev,
      [`${videoId}`]: { loading: true, error: false, preloaded: false }
    }))
  }, [])

  const handleCanPlayThrough = useCallback((videoId: number) => {
    setVideoStatus((prev) => ({
      ...prev,
      [`${videoId}`]: { ...prev[`${videoId}`], loading: false }
    }))
  }, [])

  const handleError = useCallback((videoId: number) => {
    setVideoStatus((prev) => ({
      ...prev,
      [`${videoId}`]: { loading: false, error: true, preloaded: false }
    }))
    console.error(`Erro ao carregar vídeo com ID: ${videoId}`)
  }, [])

  const handlePrevSlide = useCallback(() => {
    if (!isTransitioning) {
      slider.current?.prev()
    }
  }, [slider, isTransitioning])

  const handleNextSlide = useCallback(() => {
    if (!isTransitioning) {
      slider.current?.next()
    }
  }, [slider, isTransitioning])

  // Enhanced navigation with better UX
  const NavigationButtons = () => (
    <>
      <button
        onClick={handlePrevSlide}
        disabled={isTransitioning}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md text-white p-4 rounded-full z-50
                   opacity-0 hover:opacity-100 group-hover:opacity-80 transition-all duration-300 ease-out
                   disabled:opacity-30 disabled:cursor-not-allowed
                   hover:scale-110 hover:bg-black/90 hover:shadow-2xl
                   border border-white/10"
        aria-label="Slide anterior"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={handleNextSlide}
        disabled={isTransitioning}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md text-white p-4 rounded-full z-50
                   opacity-0 hover:opacity-100 group-hover:opacity-80 transition-all duration-300 ease-out
                   disabled:opacity-30 disabled:cursor-not-allowed
                   hover:scale-110 hover:bg-black/90 hover:shadow-2xl
                   border border-white/10"
        aria-label="Próximo slide"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </>
  )

  // Enhanced loading with skeleton
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 z-10 rounded-2xl md:rounded-3xl">
      <div className="relative">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-600 border-t-primary"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent animate-pulse"></div>
      </div>
      <p className="text-white/70 text-sm mt-4 animate-pulse">
        Carregando vídeo...
      </p>
    </div>
  )

  // Enhanced error state
  const ErrorMessage = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/90 to-red-800/90 backdrop-blur-sm text-white p-6 text-center z-10 rounded-2xl md:rounded-3xl">
      <div className="bg-red-600/20 rounded-full p-4 mb-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6" />
          <path d="M9 9l6 6" />
        </svg>
      </div>
      <p className="text-lg font-semibold mb-2">Erro ao carregar</p>
      <p className="text-sm opacity-90">Não foi possível reproduzir o vídeo</p>
    </div>
  )

  // Enhanced slide classes with improved 3D effect
  const getSlideClasses = useCallback(
    (index: number) => {
      const isActive = index === currentSlideIdx
      const isPrev =
        index === (currentSlideIdx - 1 + videos.length) % videos.length
      const isNext = index === (currentSlideIdx + 1) % videos.length

      const baseClasses = `
      rounded-2xl md:rounded-3xl overflow-hidden relative
      transition-all duration-700 ease-out
      bg-gradient-to-br from-gray-900 to-gray-800
      flex-shrink-0
      will-change-transform
      transform-gpu
      border border-white/10
    `

      let conditionalClasses = ''

      if (isActive) {
        conditionalClasses = `
        w-[200px] h-[355px] /* Ajustado para mobile */
        md:w-[380px] md:h-[676px]
        scale-100 z-40
        shadow-2xl shadow-black/60
        ring-2 ring-primary/40
        brightness-100
        blur-none
        translate-y-0
        rotate-0
      `
      } else if (isPrev) {
        conditionalClasses = `
        w-[150px] h-[267px] /* Ajustado para mobile */
        md:w-[300px] md:h-[533px]
        scale-85 z-20
        opacity-70
        shadow-xl shadow-black/40
        brightness-80
        blur-[0.5px]
        translate-y-4
        -translate-x-1
        rotate-1
      `
      } else if (isNext) {
        conditionalClasses = `
        w-[150px] h-[267px] /* Ajustado para mobile */
        md:w-[300px] md:h-[533px]
        scale-85 z-20
        opacity-70
        shadow-xl shadow-black/40
        brightness-80
        blur-[0.5px]
        translate-y-4
        translate-x-1
        -rotate-1
      `
      } else {
        conditionalClasses = `
        w-[110px] h-[195px] /* Ajustado para mobile */
        md:w-[260px] md:h-[462px]
        scale-75 z-10
        opacity-0
        shadow-lg shadow-black/20
        brightness-60
        blur-[1px]
        translate-y-6
      `
      }

      return `${baseClasses} ${conditionalClasses}`
    },
    [currentSlideIdx, videos.length]
  )

  // Slide indicators with improved styling
  const SlideIndicators = () => (
    <div className="flex justify-center space-x-2 md:space-x-3 mt-6 md:mt-8">
      {videos.map((_, index) => (
        <button
          key={index}
          onClick={() => !isTransitioning && slider.current?.moveToIdx(index)}
          disabled={isTransitioning}
          className={`transition-all duration-400 ease-out rounded-full ${
            index === currentSlideIdx
              ? 'bg-primary w-6 h-2.5 md:w-8 md:h-3 shadow-lg shadow-primary/30'
              : 'bg-white/40  w-2.5 h-2.5 md:w-3 md:h-3 hover:scale-110'
          }`}
          aria-label={`Ir para slide ${index + 1}`}
        />
      ))}
    </div>
  )

  return (
    <div className="relative w-full py-8 rounded-2xl group">
      <NavigationButtons />

      <div className="overflow-hidden px-2 md:px-4">
        <div ref={sliderRef} className="keen-slider w-full h-auto">
          {videos.map((video, index) => {
            const isActive = index === currentSlideIdx
            const isPrev =
              index === (currentSlideIdx - 1 + videos.length) % videos.length
            const isNext = index === (currentSlideIdx + 1) % videos.length
            const isVisible = isActive || isPrev || isNext
            const status = videoStatus[`${video.id}`]

            return (
              <div
                key={video.id}
                className="keen-slider__slide flex justify-center items-center min-h-0"
                aria-roledescription="slide"
                aria-label={`Vídeo ${video.title || `${index + 1}`} - ${
                  isActive ? 'atual' : 'inativo'
                }`}
              >
                <div
                  className={getSlideClasses(index)}
                  role="figure"
                  aria-label={`Container para o vídeo ${
                    video.title || `${index + 1}`
                  }`}
                  style={{
                    transform: `
                      ${isActive ? 'scale(1) translateZ(0)' : ''}
                      ${
                        isPrev
                          ? 'scale(0.85) translateX(-4px) translateZ(-10px) rotateY(3deg)'
                          : ''
                      }
                      ${
                        isNext
                          ? 'scale(0.85) translateX(4px) translateZ(-10px) rotateY(-3deg)'
                          : ''
                      }
                    `,
                    transformStyle: 'preserve-3d',
                    perspective: '800px'
                  }}
                >
                  {/* Only render video for visible slides */}
                  {isVisible && (
                    <>
                      {status?.loading && <LoadingSpinner />}

                      {status?.error ? (
                        <ErrorMessage />
                      ) : (
                        <VideoModal
                          videoSrc={video.src}
                          title={video.title}
                          thumbnail={video.thumbnailSrc}
                          onLoadStart={() => handleLoadStart(video.id)}
                          onCanPlayThrough={() =>
                            handleCanPlayThrough(video.id)
                          }
                          onError={() => handleError(video.id)}
                          aspectRatio="9:16"
                          isPlaying={isActive}
                          isMuted={!isActive}
                          showControls={isActive}
                          showPlayOverlay={isActive}
                          className="rounded-2xl md:rounded-3xl"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <SlideIndicators />
    </div>
  )
}

export default VideoCarouselModal
