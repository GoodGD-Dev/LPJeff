import React from 'react'

interface ImageItem {
  id: string
  src: string
  alt?: string
  title?: string
}

interface ImageCarouselModalProps {
  images: ImageItem[]
  initialImageIndex?: number
  triggerElement?: React.ReactNode
  arrowIcon?: React.ReactNode
  className?: string
}

const ImageCarouselModal: React.FC<ImageCarouselModalProps> = ({
  images,
  initialImageIndex = 0,
  triggerElement,
  arrowIcon,
  className = ''
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(initialImageIndex)

  // Abre modal
  const openModal = () => {
    setCurrentIndex(initialImageIndex)
    setIsOpen(true)
  }

  // Fecha modal
  const closeModal = () => setIsOpen(false)

  // Fecha modal ao pressionar ESC
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
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
  }, [isOpen])

  // Navegação do carrossel
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 0) return null

  const currentImage = images[currentIndex]

  // SVG padrão das setas
  const defaultArrowIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  )

  // Usa SVG customizado ou padrão
  const arrowSvg = arrowIcon || defaultArrowIcon

  return (
    <>
      {/* Elemento que abre o modal */}
      {triggerElement ? (
        <div onClick={openModal} className={`cursor-pointer ${className}`}>
          {triggerElement}
        </div>
      ) : (
        <div onClick={openModal} className={`cursor-pointer ${className}`}>
          <span className="text-blue-500 underline">
            Ver {images.length} imagens
          </span>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4">
          {/* Container do Modal */}
          <div className="relative max-w-lg w-full">
            {/* Botão de fechar */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            {/* Contador de imagens */}
            {images.length > 1 && (
              <div className="absolute -top-12 left-0 text-white font-mosvita text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Container do carrossel */}
            <div className="relative">
              {/* Título */}
              {currentImage.title && (
                <h2 className="text-white text-xl font-mosvita font-semibold mb-4 text-center">
                  {currentImage.title}
                </h2>
              )}

              {/* Imagem 1:1 arredondada */}
              <div className="relative w-full aspect-square">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt || 'Imagem'}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Setas de navegação (só mostra se tiver mais de 1 imagem) */}
              {images.length > 1 && (
                <>
                  {/* Seta anterior */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                  >
                    {arrowSvg}
                  </button>

                  {/* Seta próxima (espelhada) */}
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                  >
                    <div style={{ transform: 'scaleX(-1)' }}>{arrowSvg}</div>
                  </button>
                </>
              )}
            </div>

            {/* Indicadores de slides (só mostra se tiver mais de 1 imagem) */}
            {images.length > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {images.map((_, index) => (
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

            {/* Thumbnails (só mostra se tiver mais de 1 imagem e <= 5) */}
            {images.length > 1 && images.length <= 5 && (
              <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-200 ${
                      index === currentIndex
                        ? 'ring-2 ring-[#D9FF85] opacity-100'
                        : 'opacity-60 hover:opacity-80'
                    }`}
                    style={{ width: '60px', height: '60px' }}
                  >
                    <img
                      src={image.src}
                      className="w-full h-full object-cover"
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageCarouselModal

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- images: ImageItem[] - Array de imagens

PROPS OPCIONAIS:
- initialImageIndex?: number - Índice inicial (padrão: 0)
- triggerElement?: React.ReactNode - Elemento customizado para abrir modal
- arrowIcon?: React.ReactNode - SVG customizado para as setas
- className?: string - Classes CSS para o trigger

INTERFACE ImageItem:
- id: string - ID único da imagem
- src: string - URL/caminho da imagem
- alt?: string - Texto alternativo
- title?: string - Título da imagem

EXEMPLOS:

// Carrossel automático (trigger padrão)
const images = [
  { id: '1', src: 'img1.jpg', title: 'Imagem 1' },
  { id: '2', src: 'img2.jpg', title: 'Imagem 2' }
]

<ImageCarouselModal images={images} />

// Com trigger customizado
<ImageCarouselModal
  images={images}
  triggerElement={
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      Abrir Galeria ({images.length} fotos)
    </button>
  }
/>

// Com SVG customizado
const customArrow = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14l5-5 5 5z"/>
  </svg>
)

<ImageCarouselModal
  images={images}
  arrowIcon={customArrow}
  triggerElement={<button>Abrir com setas customizadas</button>}
/>

// Começando em imagem específica
<ImageCarouselModal
  images={images}
  initialImageIndex={2}
  triggerElement={<span>Ver fotos</span>}
/>

FUNCIONALIDADES:
- Auto-controlado (não precisa de isOpen/onClose)
- Trigger padrão ou customizável
- Navegação circular infinita
- Indicadores e thumbnails
- Contador de posição
- Fecha com ESC ou botão X
- Aspect ratio 1:1 arredondado
*/
