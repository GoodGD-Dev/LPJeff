import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import ImageModal from '@ui/ImageModal'

// Navigation Icons
const ChevronLeftIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
)

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  showModal = true,
  autoPlay = false,
  autoPlayInterval = 5000
}) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Verifica se há slides anteriores/próximos
  const canGoPrev = currentSlideIdx > 0
  const canGoNext = currentSlideIdx < images.length - 1

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      mode: 'snap',
      renderMode: 'performance',
      dragSpeed: 0.8,
      rubberband: false,
      slides: {
        perView: 1.25,
        spacing: 20,
        origin: 'auto'
      },
      breakpoints: {
        '(min-width: 768px)': {
          slides: {
            perView: 1.15,
            spacing: 30
          }
        },
        '(min-width: 1200px)': {
          slides: {
            perView: 1.1,
            spacing: 40
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
    []
  )

  // Auto-play functionality (desabilitado quando não é loop)
  React.useEffect(() => {
    if (autoPlay && !isHovered && slider.current && canGoNext) {
      const interval = setInterval(() => {
        if (canGoNext) {
          slider.current?.next()
        }
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [autoPlay, isHovered, autoPlayInterval, slider, canGoNext])

  const goToNext = () => slider.current?.next()
  const goToPrev = () => slider.current?.prev()

  return (
    <div
      className="relative w-full py-2 px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Buttons */}
      {canGoPrev && (
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-40
                     bg-gray-800/80 hover:bg-gray-800 text-lime-400
                     p-3 rounded-full transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-lime-400
                     opacity-70 hover:opacity-100"
          aria-label="Imagem anterior"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {canGoNext && (
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-40
                     bg-gray-800/80 hover:bg-gray-800 text-lime-400
                     p-3 rounded-full transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-lime-400
                     opacity-70 hover:opacity-100"
          aria-label="Próxima imagem"
        >
          <ChevronRightIcon />
        </button>
      )}

      <div ref={sliderRef} className="keen-slider w-full">
        {images.map((image, idx) => {
          const isActive = idx === currentSlideIdx

          return (
            <div
              key={image.id}
              className="keen-slider__slide flex justify-start items-center relative"
              aria-roledescription="slide"
              aria-label={`Imagem ${image.alt} - ${isActive ? 'atual' : 'inativa'}`}
            >
              <div
                className={`
                  relative rounded-xl overflow-hidden shadow-2xl
                  transition-all duration-300 ease-in-out transform-gpu will-change-transform
                  bg-gray-800 flex items-center justify-center
                  aspect-square w-full max-w-[380px] md:max-w-[480px] lg:max-w-[580px]
                  ${
                    isActive
                      ? 'opacity-100 z-30 scale-100'
                      : 'opacity-70 blur-[1px] z-20 scale-95'
                  }
                `}
              >
                {showModal ? (
                  <ImageModal
                    imageSrc={image.src}
                    imageAlt={image.alt}
                    imageTitle={image.title}
                    triggerElement={
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    }
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dots Indicator - Removido */}

      {/* Progress Bar (opcional) */}
      {autoPlay && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime-400 rounded-full transition-all duration-100"
            style={{
              width: `${((Date.now() % autoPlayInterval) / autoPlayInterval) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ImageCarousel

/**
 * === EXEMPLO DE USO ===
 *
 * const images = [
 *   {
 *     id: 1,
 *     src: "/path/to/image1.jpg",
 *     alt: "Descrição da imagem 1",
 *     title: "Título da imagem 1"
 *   },
 *   {
 *     id: 2,
 *     src: "/path/to/image2.jpg",
 *     alt: "Descrição da imagem 2",
 *     title: "Título da imagem 2"
 *   }
 * ]
 *
 * // Uso básico
 * <ImageCarousel images={images} />
 *
 * // Com auto-play
 * <ImageCarousel
 *   images={images}
 *   autoPlay={true}
 *   autoPlayInterval={3000}
 * />
 *
 * // Sem modal
 * <ImageCarousel images={images} showModal={false} />
 */
