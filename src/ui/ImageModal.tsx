import React from 'react'

interface ImageModalProps {
  imageSrc: string
  imageAlt?: string
  imageTitle?: string
  triggerElement?: React.ReactNode
  className?: string
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageSrc,
  imageAlt,
  imageTitle,
  triggerElement,
  className = ''
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  // Abre modal
  const openModal = () => setIsOpen(true)

  // Fecha modal
  const closeModal = () => setIsOpen(false)

  // Fecha modal ao clicar no backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

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

  return (
    <>
      {/* Elemento que abre o modal */}
      {triggerElement ? (
        <div onClick={openModal} className={`cursor-pointer ${className}`}>
          {triggerElement}
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={imageAlt || 'Imagem'}
          onClick={openModal}
          className={`cursor-pointer hover:opacity-90 transition-opacity ${className}`}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4"
          onClick={handleBackdropClick}
        >
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

            {/* Título */}
            {imageTitle && (
              <h2 className="text-white text-xl font-mosvita font-semibold mb-4 text-center">
                {imageTitle}
              </h2>
            )}

            {/* Imagem 1:1 arredondada */}
            <div className="relative w-full aspect-square">
              <img
                src={imageSrc}
                alt={imageAlt || 'Imagem'}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageModal

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- imageSrc: string - URL/caminho da imagem

PROPS OPCIONAIS:
- imageAlt?: string - Texto alternativo da imagem
- imageTitle?: string - Título da imagem
- triggerElement?: React.ReactNode - Elemento customizado para abrir modal
- className?: string - Classes CSS para o trigger

EXEMPLOS:

// Modal automático (clica na imagem para abrir)
<ImageModal
  imageSrc="caminho/da/imagem.jpg"
  imageTitle="Título da Imagem"
/>

// Com trigger customizado
<ImageModal
  imageSrc="imagem.jpg"
  triggerElement={
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      Ver Imagem
    </button>
  }
/>

// Com classes no trigger
<ImageModal
  imageSrc="imagem.jpg"
  className="w-32 h-32 rounded-full"
/>

FUNCIONALIDADES:
- Auto-controlado (não precisa de isOpen/onClose)
- Clique na imagem abre modal automaticamente
- Trigger customizável
- Fecha com ESC, backdrop ou botão X
- Aspect ratio 1:1 arredondado
- Responsivo e acessível
*/
