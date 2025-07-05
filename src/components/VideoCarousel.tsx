import React from 'react'
import VideoPlayer from '@ui/VideoModal'

// Interface do vídeo do carrossel
interface VideoItem {
  id: string
  videoSrc: string
  title?: string
}

// Props do modal carrossel
interface VideoCarouselModalProps {
  isOpen: boolean
  onClose: () => void
  videos: VideoItem[]
  initialVideoIndex?: number
}

const VideoCarouselModal: React.FC<VideoCarouselModalProps> = ({
  isOpen,
  onClose,
  videos,
  initialVideoIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialVideoIndex)

  // Fecha modal ao clicar no backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Fecha modal ao pressionar ESC
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Reset do índice quando modal abre
  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialVideoIndex)
    }
  }, [isOpen, initialVideoIndex])

  // Navegação do carrossel
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!isOpen || videos.length === 0) return null

  const currentVideo = videos[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      {/* Container do Modal */}
      <div className="relative max-w-5xl w-full">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {/* Contador de vídeos */}
        {videos.length > 1 && (
          <div className="absolute -top-12 left-0 text-white font-mosvita text-sm">
            {currentIndex + 1} / {videos.length}
          </div>
        )}

        {/* Container do carrossel */}
        <div className="relative">
          {/* Vídeo atual */}
          <VideoPlayer
            videoSrc={currentVideo.videoSrc}
            title={currentVideo.title}
            autoPlay={false}
          />

          {/* Setas de navegação (só mostra se tiver mais de 1 vídeo) */}
          {videos.length > 1 && (
            <>
              {/* Seta anterior */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>

              {/* Seta próxima */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Indicadores de slides (só mostra se tiver mais de 1 vídeo) */}
        {videos.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#D9FF85]'
                    : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Thumbnails (só mostra se tiver mais de 1 vídeo) */}
        {videos.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-200 ${
                  index === currentIndex
                    ? 'ring-2 ring-[#D9FF85] opacity-100'
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={{ width: '80px', height: '45px' }}
              >
                <video
                  src={video.videoSrc}
                  className="w-full h-full object-cover"
                  muted
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                {video.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 truncate">
                    {video.title}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoCarouselModal

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- isOpen: boolean - Controla se o modal está aberto
- onClose: () => void - Função para fechar o modal
- videos: VideoItem[] - Array de vídeos

PROPS OPCIONAIS:
- initialVideoIndex?: number - Índice inicial (padrão: 0)

INTERFACE VideoItem:
- id: string - ID único do vídeo
- videoSrc: string - URL/caminho do vídeo
- title?: string - Título opcional do vídeo

EXEMPLOS:

// Array de vídeos
const videos = [
  {
    id: '1',
    videoSrc: 'video1.mp4',
    title: 'Primeiro Vídeo'
  },
  {
    id: '2',
    videoSrc: 'video2.mp4',
    title: 'Segundo Vídeo'
  },
  // ... quantos vídeos quiser
]

// Modal básico
<VideoCarouselModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  videos={videos}
/>

// Com vídeo inicial específico
<VideoCarouselModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  videos={videos}
  initialVideoIndex={2}
/>

FUNCIONALIDADES:
- Navegação com setas (só aparece se > 1 vídeo)
- Indicadores clicáveis (dots)
- Thumbnails clicáveis
- Contador "1 / 3"
- Navegação circular
- Fecha com ESC ou clicando fora
- Se só 1 vídeo: esconde navegação
- Reutiliza componente VideoPlayer
- Responsivo e acessível
*/
