import React from 'react'

interface VideoPlayerProps {
  videoSrc: string
  title?: string
  autoPlay?: boolean
  className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  title,
  autoPlay = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  // Controla play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Atualiza estado do play quando vídeo muda
  const handleVideoPlay = () => setIsPlaying(true)
  const handleVideoPause = () => setIsPlaying(false)

  return (
    <div className={`w-full ${className}`}>
      {/* Título do vídeo */}
      {title && (
        <h2 className="text-white text-xl font-mosvita font-semibold mb-4 text-center">
          {title}
        </h2>
      )}

      {/* Container do vídeo */}
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
        {/* Vídeo */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoSrc}
          autoPlay={autoPlay}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          style={{
            borderRadius: '16px'
          }}
        />

        {/* Overlay com botão play customizado */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
            onClick={togglePlay}
          >
            {/* Botão Play Customizado */}
            <div
              className="flex items-center justify-center bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%'
              }}
            >
              {/* SVG Play Personalizado */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 5V19L19 12L8 5Z"
                  fill="#191919"
                  stroke="#191919"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Controls customizados */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Barra de progresso */}
          <div className="mb-3">
            <div className="w-full bg-gray-600 rounded-full h-1">
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: '#D9FF85',
                  width: '30%' // Aqui você conectaria com o progresso real do vídeo
                }}
              />
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center justify-between text-white">
            {/* Play/Pause */}
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

            {/* Tempo */}
            <div className="text-sm font-mosvita">
              <span style={{ color: '#D9FF85' }}>02:30</span>
              <span className="mx-1">/</span>
              <span>08:45</span>
            </div>

            {/* Fullscreen */}
            <button className="hover:text-[#D9FF85] transition-colors">
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
      </div>
    </div>
  )
}

export default VideoPlayer

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- videoSrc: string - URL/caminho do vídeo

PROPS OPCIONAIS:
- title?: string - Título do vídeo
- autoPlay?: boolean - Auto-reprodução (padrão: false)
- className?: string - Classes CSS extras

EXEMPLOS:

// Player básico
<VideoPlayer videoSrc="video.mp4" />

// Com título
<VideoPlayer
  videoSrc="https://exemplo.com/video.mp4"
  title="Meu Vídeo"
/>

// Com autoplay e className
<VideoPlayer
  videoSrc="video.mp4"
  title="Vídeo Demonstrativo"
  autoPlay={true}
  className="mb-8"
/>

ESPECIFICAÇÕES:
- Botão Play: 60x60px circular
- Timeline: Cor #D9FF85
- Border-radius: 16px
- Controls customizados
- SVG personalizado no play
- Sempre visível na página
- Responsivo (aspect-video)
*/
