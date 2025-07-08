// Cardtest.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import VideoPlayer from '@ui/VideoModal' // Verifique o caminho real para o seu VideoModal

// 1. Definindo a interface para o tipo de objeto de vídeo
interface Video {
  id: number
  src: string
  thumbnailSrc?: string
  title?: string
}

// 2. Atualizando o array VIDEOS para corresponder à nova interface
const VIDEOS: Video[] = [
  {
    id: 1,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video1/1280/720'
  },
  {
    id: 2,
    src: 'https://www.w3schools.com/html/movie.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video2/1280/720'
  },
  {
    id: 3,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video3/1280/720'
  },
  {
    id: 4,
    src: 'https://www.w3schools.com/html/movie.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video4/1280/720'
  },
  {
    id: 5,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video5/1280/720'
  },
  {
    id: 6,
    src: 'https://www.w3schools.com/html/movie.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video6/1280/720'
  },
  {
    id: 7,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video7/1280/720'
  },
  {
    id: 8,
    src: 'https://www.w3schools.com/html/movie.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video8/1280/720'
  },
  {
    id: 9,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailSrc: 'https://picsum.photos/seed/video9/1280/720'
  }
]

export default function CardTest() {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0)
  // Certifique-se de que o estado videoStatus também reflita os IDs como chaves numéricas
  const [videoStatus, setVideoStatus] = useState<
    Record<number, { loading: boolean; error: boolean }>
  >(
    VIDEOS.reduce(
      (acc, video) => ({
        ...acc,
        [video.id]: { loading: false, error: false }
      }),
      {}
    )
  )

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      mode: 'snap',
      renderMode: 'performance',
      dragSpeed: 0.8,
      rubberband: false,
      slides: {
        perView: 1.35, // Mobile
        spacing: -120, // Mobile
        origin: 'center'
      },
      breakpoints: {
        '(min-width: 768px)': {
          slides: {
            perView: 2.2,
            spacing: -160,
            origin: 'center'
          }
        },
        '(min-width: 1200px)': {
          slides: {
            perView: 2.1,
            spacing: -200,
            origin: 'center'
          }
        }
      },
      initial: 0,
      slideChanged(s) {
        setCurrentSlideIdx(s.track.details.rel)
      },
      created(s) {
        s.emit('slideChanged')
      }
    },
    [] // Plugins array permanece vazio
  )

  const handleLoadStart = useCallback((videoId: number) => {
    setVideoStatus((prev) => ({
      ...prev,
      [videoId]: { ...prev[videoId], loading: true, error: false }
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
      [videoId]: { ...prev[videoId], loading: false, error: true }
    }))
    console.error(`Erro ao carregar vídeo com ID: ${videoId}`)
  }, [])

  return (
    <div className="relative w-full py-10 px-4">
      {slider && (
        <>
          <button
            onClick={() => slider.current?.prev()}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-40 ml-2 opacity-75 hover:opacity-100 transition-opacity"
            aria-label="Slide anterior"
          >
            &#10094;
          </button>
          <button
            onClick={() => slider.current?.next()}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-40 mr-2 opacity-75 hover:opacity-100 transition-opacity"
            aria-label="Próximo slide"
          >
            &#10095;
          </button>
        </>
      )}

      <div ref={sliderRef} className="keen-slider w-full">
        {VIDEOS.map((video) => {
          const isActive =
            VIDEOS.findIndex((v) => v.id === video.id) === currentSlideIdx
          const status = videoStatus[video.id]

          return (
            <div
              key={video.id}
              className="keen-slider__slide flex justify-center items-center"
              aria-roledescription="slide"
              aria-label={`Vídeo ${video.title} - ${isActive ? 'atual' : 'inativo'}`}
            >
              <div
                className={`
                  w-[240px] h-[440px] // Padrão para mobile
                  md:w-[320px] md:h-[560px] // Tamanho maior no desktop
                  rounded-xl overflow-hidden relative transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? 'scale-100 z-30 shadow-2xl'
                      : 'scale-75 z-20 opacity-60 blur-sm will-change-transform transform-gpu'
                  }
                  bg-black
                `}
                role="figure"
                aria-label={`Container para o vídeo ${video.title}`}
              >
                {status.loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-lime-400"></div>
                    <span className="sr-only">Carregando vídeo...</span>
                  </div>
                )}

                {status.error ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-800/80 text-white p-4 text-center z-10">
                    <p className="text-lg font-bold mb-2">Erro!</p>
                    <p className="text-sm">
                      Não foi possível carregar o vídeo.
                    </p>
                    <p className="text-xs mt-1">
                      Verifique a URL ou sua conexão.
                    </p>
                  </div>
                ) : (
                  <VideoPlayer
                    videoSrc={video.src}
                    title={video.title} // Agora video.title existe
                    thumbnail={video.thumbnailSrc}
                    aspectRatio="9:16"
                    isPlaying={isActive}
                    isMuted={!isActive}
                    showControls={isActive}
                    onLoadStart={() => handleLoadStart(video.id)}
                    onCanPlayThrough={() => handleCanPlayThrough(video.id)}
                    onError={() => handleError(video.id)}
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
