import { VideoPlayerProps } from '@/types'
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Icon from './Svgs'

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
    <div className="hover:scale-110 transition-transform duration-200 w-14 h-14">
      <Icon type="play" />
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
