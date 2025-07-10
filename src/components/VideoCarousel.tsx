import React, { useState, useCallback, useMemo } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import VideoPlayer from '@ui/VideoModal'
import { Video } from '@types'

interface VideoCarouselModalProps {
  videos: Video[]
}

interface VideoStatus {
  loading: boolean
  error: boolean
}

const VideoCarouselModal: React.FC<VideoCarouselModalProps> = ({ videos }) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0)
  const [videoStatus, setVideoStatus] = useState<Record<number, VideoStatus>>(
    {}
  )

  // Memoizar configurações do slider para evitar recriações desnecessárias
  const sliderOptions = useMemo(
    () => ({
      loop: true,
      mode: 'snap' as const,
      renderMode: 'performance' as const,
      dragSpeed: 0.8,
      rubberband: false,
      slides: {
        perView: 1.35,
        spacing: -120,
        origin: 'center' as const
      },
      breakpoints: {
        '(min-width: 768px)': {
          slides: {
            perView: 2.2,
            spacing: -160,
            origin: 'center' as const
          }
        },
        '(min-width: 1200px)': {
          slides: {
            perView: 2.1,
            spacing: -200,
            origin: 'center' as const
          }
        }
      },
      initial: 0,
      slideChanged: (slider: any) => {
        setCurrentSlideIdx(slider.track.details.rel)
      }
    }),
    []
  )

  const [sliderRef, slider] = useKeenSlider(sliderOptions)

  // Handlers otimizados com useCallback
  const handleLoadStart = useCallback((videoId: number) => {
    setVideoStatus((prev) => ({
      ...prev,
      [videoId]: { loading: true, error: false }
    }))
  }, [])

  const handleCanPlayThrough = useCallback((videoId: number) => {
    setVideoStatus((prev) => ({
      ...prev,
      [videoId]: { ...prev[videoId], loading: false }
    }))
  }, [])

  const handleError = useCallback((videoId: number) => {
    setVideoStatus((prev) => ({
      ...prev,
      [videoId]: { loading: false, error: true }
    }))
    console.error(`Erro ao carregar vídeo com ID: ${videoId}`)
  }, [])

  const handlePrevSlide = useCallback(() => {
    slider.current?.prev()
  }, [slider])

  const handleNextSlide = useCallback(() => {
    slider.current?.next()
  }, [slider])

  // Componente de navegação extraído para melhor organização
  const NavigationButtons = () => (
    <>
      <button
        onClick={handlePrevSlide}
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-secondary-light text-text p-2 rounded-full z-40 ml-2 opacity-75 hover:opacity-100 transition-opacity"
        aria-label="Slide anterior"
      >
        &#10094;
      </button>
      <button
        onClick={handleNextSlide}
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-secondary-light text-text p-2 rounded-full z-40 mr-2 opacity-75 hover:opacity-100 transition-opacity"
        aria-label="Próximo slide"
      >
        &#10095;
      </button>
    </>
  )

  // Componente de loading extraído
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-secondary-light z-10 text-text">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      <span className="sr-only">Carregando vídeo...</span>
    </div>
  )

  // Componente de erro extraído
  const ErrorMessage = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-800/80 text-text p-4 text-center z-10">
      <p className="text-lg font-bold mb-2">Erro!</p>
      <p className="text-sm">Não foi possível carregar o vídeo.</p>
      <p className="text-xs mt-1">Verifique a URL ou sua conexão.</p>
    </div>
  )

  // Função para obter classes de estilo do slide
  const getSlideClasses = useCallback((isActive: boolean) => {
    const baseClasses = `
      w-[240px] h-[440px]
      md:w-[320px] md:h-[560px]
      rounded-xl overflow-hidden relative
      transition-all duration-300 ease-in-out
      bg-black flex-shrink-0
    `

    const conditionalClasses = isActive
      ? 'scale-100 z-30 shadow-2xl'
      : 'scale-75 z-20 opacity-60 blur-sm will-change-transform transform-gpu'

    return `${baseClasses} ${conditionalClasses}`
  }, [])

  return (
    <div className="relative w-full py-10 px-4">
      {slider && <NavigationButtons />}

      <div ref={sliderRef} className="keen-slider w-full h-auto">
        {videos.map((video, index) => {
          const isActive = index === currentSlideIdx
          const status = videoStatus[video.id]

          return (
            <div
              key={video.id}
              className="keen-slider__slide flex justify-center items-center min-h-0"
              aria-roledescription="slide"
              aria-label={`Vídeo ${video.title} - ${isActive ? 'atual' : 'inativo'}`}
            >
              <div
                className={getSlideClasses(isActive)}
                role="figure"
                aria-label={`Container para o vídeo ${video.title}`}
              >
                {status?.loading && <LoadingSpinner />}

                {status?.error ? (
                  <ErrorMessage />
                ) : (
                  <VideoPlayer
                    videoSrc={video.src}
                    title={video.title}
                    thumbnail={video.thumbnailSrc}
                    onLoadStart={() => handleLoadStart(video.id)}
                    onCanPlayThrough={() => handleCanPlayThrough(video.id)}
                    onError={() => handleError(video.id)}
                    aspectRatio="9:16"
                    isPlaying={isActive}
                    isMuted={!isActive}
                    showControls={isActive}
                    showPlayOverlay={isActive}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VideoCarouselModal
