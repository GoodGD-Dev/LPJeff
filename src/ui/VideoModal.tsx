import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  title,
  className = '',
  thumbnail,
  aspectRatio = '1:1',
  isPlaying,
  isMuted,
  showControls,
  onLoadStart,
  onCanPlayThrough,
  onError,
  showPlayOverlay = true
}) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [internalIsPlaying, setInternalIsPlaying] = useState(isPlaying)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Memorizar classe de aspect ratio
  const aspectRatioClass = useMemo(() => {
    const aspectRatioMap = {
      '16:9': 'aspect-video',
      '9:16': 'aspect-[9/16]',
      '1:1': 'aspect-square'
    }
    return aspectRatioMap[aspectRatio] || 'aspect-square'
  }, [aspectRatio])

  // Memorizar formatação de tempo
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [])

  // Memorizar percentual de progresso
  const progressPercentage = useMemo(() => {
    return duration > 0 ? (currentTime / duration) * 100 : 0
  }, [currentTime, duration])

  // Controle de reprodução baseado na prop externa
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
    video.controls = false

    if (isPlaying && video.paused) {
      video.play().catch((error) => {
        console.warn(
          'VideoPlayer: Autoplay bloqueado ou erro ao reproduzir:',
          error
        )
      })
    } else if (!isPlaying && !video.paused) {
      video.pause()
    }
  }, [isPlaying, isMuted])

  // Reset do vídeo quando se torna inativo
  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.currentTime = 0
      setHasStarted(false)
      setInternalIsPlaying(false)
    }
  }, [isPlaying])

  // Handlers de eventos do vídeo
  const handlePlay = useCallback(() => {
    setInternalIsPlaying(true)
    setHasStarted(true)
  }, [])

  const handlePause = useCallback(() => {
    setInternalIsPlaying(false)
  }, [])

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }, [])

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (videoRef.current && duration > 0) {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const newTime = (clickX / rect.width) * duration
        videoRef.current.currentTime = newTime
        setCurrentTime(newTime)
      }
    },
    [duration]
  )

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (internalIsPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [internalIsPlaying])

  const toggleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }, [])

  const handleThumbnailClick = useCallback(() => {
    setHasStarted(true)
    videoRef.current?.play()
  }, [])

  // Componente de SVG do botão play
  const PlayButton = () => (
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
  )

  // Overlay de thumbnail
  const ThumbnailOverlay = () => (
    <div className="absolute inset-0 z-10">
      <img
        src={thumbnail}
        alt="Video thumbnail"
        className="w-full h-full object-cover"
        style={{ borderRadius: '16px' }}
      />
      {showPlayOverlay && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handleThumbnailClick}
        >
          <PlayButton />
        </div>
      )}
    </div>
  )

  // Overlay de play/pause
  const PlayOverlay = () => (
    <div
      className="absolute inset-0 flex items-center justify-center cursor-pointer"
      onClick={() => videoRef.current?.play()}
    >
      <PlayButton />
    </div>
  )

  // Controles de vídeo
  const VideoControls = () => (
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
          onClick={togglePlayPause}
          className="hover:text-[#D9FF85] transition-colors"
        >
          {internalIsPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {duration > 0 && (
          <div className="text-sm font-mosvita">
            <span style={{ color: '#D9FF85' }}>{formatTime(currentTime)}</span>
            <span className="mx-1">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        )}

        <button
          onClick={toggleFullscreen}
          className="hover:text-[#D9FF85] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
          </svg>
        </button>
      </div>
    </div>
  )

  // Renderização do overlay baseada no estado
  const renderOverlay = () => {
    if (!hasStarted && thumbnail) {
      return <ThumbnailOverlay />
    }

    if (!internalIsPlaying && showPlayOverlay) {
      return <PlayOverlay />
    }

    return null
  }

  return (
    <div className={`w-full h-full ${className}`}>
      {title && (
        <h2 className="text-white text-xl font-mosvita font-semibold mb-4 text-center">
          {title}
        </h2>
      )}

      <div
        className={`relative w-full h-full ${aspectRatioClass} bg-black rounded-2xl overflow-hidden shadow-2xl`}
      >
        {renderOverlay()}

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onLoadStart={onLoadStart}
          onCanPlayThrough={onCanPlayThrough}
          onError={onError}
          style={{ borderRadius: '16px' }}
          loop
        />

        {showControls && <VideoControls />}
      </div>
    </div>
  )
}

export default VideoPlayer
