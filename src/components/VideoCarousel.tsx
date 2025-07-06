import React, { useState, useRef, useEffect } from 'react'

// Interface para os dados do vídeo
interface VideoData {
  id: string
  videoSrc: string
  title: string
  thumbnail?: string
}

// Props do VideoPlayer
interface VideoPlayerProps {
  videoSrc: string
  title?: string
  autoPlay?: boolean
  className?: string
  thumbnail?: string
  aspectRatio?: '1:1' | '16:9' | '9:16'
}

// VideoPlayer component integrado
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  title,
  autoPlay = false,
  className = '',
  thumbnail,
  aspectRatio = '9:16'
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video'
      case '9:16':
        return 'aspect-[9/16]'
      case '1:1':
      default:
        return 'aspect-square'
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
        setHasStarted(true)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoPlay = () => setIsPlaying(true)
  const handleVideoPause = () => setIsPlaying(false)
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleMouseEnter = () => setShowControls(true)
  const handleMouseLeave = () => setShowControls(false)

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h2 className="text-white text-xl font-semibold mb-4 text-center">
          {title}
        </h2>
      )}

      <div
        className={`relative w-full ${getAspectRatioClass()} bg-black rounded-2xl overflow-hidden shadow-2xl`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!hasStarted && thumbnail && (
          <div className="absolute inset-0 z-10">
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              style={{ borderRadius: '16px' }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              <div className="hover:scale-110 transition-transform duration-200">
                <svg
                  width="61"
                  height="61"
                  viewBox="0 0 61 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.5 5.89868C44.3075 5.89868 55.5 17.0912 55.5 30.8987C55.5 44.7062 44.3075 55.8987 30.5 55.8987C16.6925 55.8987 5.49998 44.7062 5.49998 30.8987C5.49998 17.0912 16.6925 5.89868 30.5 5.89868ZM30.5 10.8987C25.1957 10.8987 20.1086 13.0058 16.3579 16.7565C12.6071 20.5073 10.5 25.5944 10.5 30.8987C10.5 36.203 12.6071 41.2901 16.3579 45.0408C20.1086 48.7916 25.1957 50.8987 30.5 50.8987C35.8043 50.8987 40.8914 48.7916 44.6421 45.0408C48.3929 41.2901 50.5 36.203 50.5 30.8987C50.5 25.5944 48.3929 20.5073 44.6421 16.7565C40.8914 13.0058 35.8043 10.8987 30.5 10.8987ZM22.91 22.5237C22.9653 22.0638 23.127 21.6231 23.3823 21.2366C23.6377 20.8501 23.9796 20.5284 24.381 20.2971C24.7823 20.0659 25.2321 19.9314 25.6945 19.9043C26.157 19.8772 26.6194 19.9583 27.045 20.1412L27.8575 20.4987L28.9575 21.0037L29.83 21.4262L30.805 21.9162L31.88 22.4737L33.035 23.1012L34.27 23.8012L34.8925 24.1637L36.065 24.8687L37.135 25.5387L38.545 26.4587L39.705 27.2537L40.8425 28.0737L41.05 28.2262C42.6375 29.4187 42.65 31.7987 41.0525 32.9987L40.345 33.5212L39.3625 34.2112L38.1225 35.0487L37.155 35.6737L36.08 36.3487L34.8975 37.0562C34.6925 37.1779 34.4825 37.3004 34.2675 37.4237L33.0225 38.1287L31.8575 38.7612L30.7825 39.3212L29.8075 39.8112L28.545 40.4162L27.545 40.8687L27.04 41.0887C26.6146 41.2701 26.1527 41.35 25.6911 41.3221C25.2294 41.2941 24.7806 41.1591 24.3802 40.9277C23.9797 40.6963 23.6387 40.3749 23.3839 39.9889C23.1292 39.6029 22.9678 39.1629 22.9125 38.7037L22.7775 37.4562L22.7025 36.6212L22.5975 35.1237L22.5375 33.9737L22.4925 32.7087L22.4675 31.3362V29.8887L22.4925 28.5187L22.5375 27.2537L22.5975 26.1037L22.7025 24.6062L22.88 22.7812L22.91 22.5237ZM27.62 25.9112L27.5525 27.0787L27.5 28.3912L27.47 29.8412V31.3862L27.5 32.8362L27.55 34.1487L27.62 35.3162L28.66 34.7912L29.225 34.4962L30.445 33.8412L31.77 33.0937L33.075 32.3212L33.68 31.9512L34.79 31.2512L35.765 30.6137L34.785 29.9712L33.675 29.2687L32.435 28.5187C31.7799 28.1312 31.119 27.7536 30.4525 27.3862L29.2325 26.7312L28.1275 26.1637L27.62 25.9112Z"
                    fill="#D9FF85"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoSrc}
          autoPlay={autoPlay}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          style={{ borderRadius: '16px' }}
        />

        {!isPlaying && hasStarted && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <div className="hover:scale-110 transition-transform duration-200">
              <svg
                width="61"
                height="61"
                viewBox="0 0 61 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30.5 5.89868C44.3075 5.89868 55.5 17.0912 55.5 30.8987C55.5 44.7062 44.3075 55.8987 30.5 55.8987C16.6925 55.8987 5.49998 44.7062 5.49998 30.8987C5.49998 17.0912 16.6925 5.89868 30.5 5.89868ZM30.5 10.8987C25.1957 10.8987 20.1086 13.0058 16.3579 16.7565C12.6071 20.5073 10.5 25.5944 10.5 30.8987C10.5 36.203 12.6071 41.2901 16.3579 45.0408C20.1086 48.7916 25.1957 50.8987 30.5 50.8987C35.8043 50.8987 40.8914 48.7916 44.6421 45.0408C48.3929 41.2901 50.5 36.203 50.5 30.8987C50.5 25.5944 48.3929 20.5073 44.6421 16.7565C40.8914 13.0058 35.8043 10.8987 30.5 10.8987ZM22.91 22.5237C22.9653 22.0638 23.127 21.6231 23.3823 21.2366C23.6377 20.8501 23.9796 20.5284 24.381 20.2971C24.7823 20.0659 25.2321 19.9314 25.6945 19.9043C26.157 19.8772 26.6194 19.9583 27.045 20.1412L27.8575 20.4987L28.9575 21.0037L29.83 21.4262L30.805 21.9162L31.88 22.4737L33.035 23.1012L34.27 23.8012L34.8925 24.1637L36.065 24.8687L37.135 25.5387L38.545 26.4587L39.705 27.2537L40.8425 28.0737L41.05 28.2262C42.6375 29.4187 42.65 31.7987 41.0525 32.9987L40.345 33.5212L39.3625 34.2112L38.1225 35.0487L37.155 35.6737L36.08 36.3487L34.8975 37.0562C34.6925 37.1779 34.4825 37.3004 34.2675 37.4237L33.0225 38.1287L31.8575 38.7612L30.7825 39.3212L29.8075 39.8112L28.545 40.4162L27.545 40.8687L27.04 41.0887C26.6146 41.2701 26.1527 41.35 25.6911 41.3221C25.2294 41.2941 24.7806 41.1591 24.3802 40.9277C23.9797 40.6963 23.6387 40.3749 23.3839 39.9889C23.1292 39.6029 22.9678 39.1629 22.9125 38.7037L22.7775 37.4562L22.7025 36.6212L22.5975 35.1237L22.5375 33.9737L22.4925 32.7087L22.4675 31.3362V29.8887L22.4925 28.5187L22.5375 27.2537L22.5975 26.1037L22.7025 24.6062L22.88 22.7812L22.91 22.5237ZM27.62 25.9112L27.5525 27.0787L27.5 28.3912L27.47 29.8412V31.3862L27.5 32.8362L27.55 34.1487L27.62 35.3162L28.66 34.7912L29.225 34.4962L30.445 33.8412L31.77 33.0937L33.075 32.3212L33.68 31.9512L34.79 31.2512L35.765 30.6137L34.785 29.9712L33.675 29.2687L32.435 28.5187C31.7799 28.1312 31.119 27.7536 30.4525 27.3862L29.2325 26.7312L28.1275 26.1637L27.62 25.9112Z"
                  fill="#D9FF85"
                />
              </svg>
            </div>
          </div>
        )}

        {hasStarted && (showControls || isPlaying) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300">
            <div className="mb-3">
              <div
                className="w-full bg-gray-600 rounded-full h-1 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: '#D9FF85',
                    width: `${progressPercentage}%`
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-white">
              <button
                onClick={togglePlay}
                className="hover:text-[#D9FF85] transition-colors"
              >
                {isPlaying ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {duration > 0 && (
                <div className="text-sm">
                  <span style={{ color: '#D9FF85' }}>
                    {formatTime(currentTime)}
                  </span>
                  <span className="mx-1">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              )}

              <button
                onClick={toggleFullscreen}
                className="hover:text-[#D9FF85] transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Props do carrosel
interface VideoCarouselProps {
  videos: VideoData[]
  className?: string
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Função para calcular o índice com loop infinito
  const getLoopedIndex = (index: number) => {
    if (videos.length === 0) return 0
    return ((index % videos.length) + videos.length) % videos.length
  }

  // Navegar para o próximo vídeo
  const nextVideo = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  // Navegar para o vídeo anterior
  const prevVideo = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  // Handlers de touch/mouse para arrastar
  const handleStart = (clientX: number) => {
    setStartX(clientX)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setDragOffset(diff)
  }

  const handleEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 50 // Mínimo de pixels para trocar de vídeo

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevVideo()
      } else {
        nextVideo()
      }
    }

    setDragOffset(0)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Prevenir seleção de texto durante o arrastar
  useEffect(() => {
    const preventSelection = (e: Event) => {
      if (isDragging) e.preventDefault()
    }

    document.addEventListener('selectstart', preventSelection)
    return () => document.removeEventListener('selectstart', preventSelection)
  }, [isDragging])

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-white">
        <p>Nenhum vídeo disponível</p>
      </div>
    )
  }

  // Calcular os índices dos vídeos visíveis
  const prevIndex = getLoopedIndex(currentIndex - 1)
  const nextIndex = getLoopedIndex(currentIndex + 1)
  const currentVideoIndex = getLoopedIndex(currentIndex)

  return (
    <div className={`w-full ${className}`}>
      {/* Container do carrosel */}
      <div
        ref={carouselRef}
        className="relative w-full h-[600px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Container dos vídeos */}
        <div
          className={`flex items-center justify-center h-full transition-transform duration-300 ease-out ${isTransitioning ? '' : 'transition-none'}`}
          style={{
            transform: `translateX(${dragOffset}px)`
          }}
        >
          {/* Vídeo anterior (esquerda) */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-60 scale-75 z-10">
            <div className="w-48">
              <VideoPlayer
                videoSrc={videos[prevIndex].videoSrc}
                title={videos[prevIndex].title}
                thumbnail={videos[prevIndex].thumbnail}
                aspectRatio="9:16"
                className="pointer-events-none"
              />
            </div>
          </div>

          {/* Vídeo atual (centro) */}
          <div className="z-20">
            <div className="w-64">
              <VideoPlayer
                videoSrc={videos[currentVideoIndex].videoSrc}
                title={videos[currentVideoIndex].title}
                thumbnail={videos[currentVideoIndex].thumbnail}
                aspectRatio="9:16"
              />
            </div>
          </div>

          {/* Vídeo próximo (direita) */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-60 scale-75 z-10">
            <div className="w-48">
              <VideoPlayer
                videoSrc={videos[nextIndex].videoSrc}
                title={videos[nextIndex].title}
                thumbnail={videos[nextIndex].thumbnail}
                aspectRatio="9:16"
                className="pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Botões de navegação */}
        <button
          onClick={prevVideo}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          disabled={isTransitioning}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <button
          onClick={nextVideo}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          disabled={isTransitioning}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>

      {/* Indicadores de posição */}
      <div className="flex justify-center mt-6 space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setCurrentIndex(index)
                setTimeout(() => setIsTransitioning(false), 300)
              }
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              getLoopedIndex(currentIndex) === index
                ? 'bg-[#D9FF85]'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Informações do vídeo atual */}
      <div className="text-center mt-4">
        <h3 className="text-white text-lg font-semibold">
          {videos[currentVideoIndex].title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {getLoopedIndex(currentIndex) + 1} de {videos.length}
        </p>
      </div>
    </div>
  )
}

export default VideoCarousel

/*
=== EXEMPLO DE USO ===

import VideoCarousel from './VideoCarousel';

const videos = [
  {
    id: '1',
    videoSrc: 'video1.mp4',
    title: 'Vídeo 1',
    thumbnail: 'thumb1.jpg'
  },
  {
    id: '2',
    videoSrc: 'video2.mp4',
    title: 'Vídeo 2',
    thumbnail: 'thumb2.jpg'
  }
  // ... mais vídeos
];

// Uso do componente
<VideoCarousel
  videos={videos}
  className="max-w-4xl mx-auto"
/>

=== PROPS ===

OBRIGATÓRIAS:
- videos: VideoData[] - Array com os dados dos vídeos

OPCIONAIS:
- className?: string - Classes CSS extras

=== INTERFACE VideoData ===
{
  id: string;           // ID único do vídeo
  videoSrc: string;     // URL/caminho do vídeo
  title: string;        // Título do vídeo
  thumbnail?: string;   // URL da thumbnail (opcional)
}
*/
