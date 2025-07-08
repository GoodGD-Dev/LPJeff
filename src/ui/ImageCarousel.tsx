// src/components/ImageCarousel.tsx
import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css' // Certifique-se de que o CSS do keen-slider está importado

interface ImageItem {
  id: number | string
  src: string
  alt: string
}

interface ImageCarouselProps {
  images: ImageItem[]
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0)

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'snap',
      renderMode: 'performance',
      dragSpeed: 0.8,
      rubberband: false,
      slides: {
        perView: 1.25, // Aumentado para mostrar cerca de 25% da próxima imagem
        spacing: 20, // Espaçamento entre as imagens
        origin: 'auto' // Alinha o slide ativo à esquerda
      },
      breakpoints: {
        '(min-width: 768px)': {
          slides: {
            perView: 1.15, // Para telas maiores, a imagem ativa ocupa mais espaço, mostrando uns 15% da próxima
            spacing: 30
          }
        },
        '(min-width: 1200px)': {
          slides: {
            perView: 1.1, // Em telas muito grandes, a próxima imagem aparece bem sutilmente (10%)
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

  return (
    <div className="relative w-full py-10 px-4">
      <div ref={sliderRef} className="keen-slider w-full">
        {images.map((image, idx) => {
          const isActive = idx === currentSlideIdx

          // Lógica para identificar o slide que está visível e é o "próximo"
          let isNextPartialSlide = false
          if (slider.current && slider.current.track.details) {
            const activeAbsIdx = slider.current.track.details.abs // Índice absoluto do slide ativo
            const nextAbsIdx = (activeAbsIdx + 1) % images.length // Próximo índice absoluto considerando loop

            // Verifica se o slide atual (idx) corresponde ao próximo slide absoluto
            // e se ele está dentro da faixa de slides visíveis (uma heurística simples)
            const slideDetail = slider.current.track.details.slides[idx]
            if (slideDetail && slideDetail.abs === nextAbsIdx) {
              // Para carrosseis com origin:auto e perView > 1, o keen-slider geralmente renderiza
              // o próximo slide logo após o ativo no DOM.
              isNextPartialSlide = true
            }
          }

          return (
            <div
              key={image.id}
              className="keen-slider__slide flex justify-start items-center relative" // justify-start para garantir alinhamento à esquerda no slide
              aria-roledescription="slide"
              aria-label={`Imagem ${image.alt} - ${isActive ? 'atual' : 'inativa'}`}
            >
              <div
                className={`
                  relative
                  rounded-xl overflow-hidden shadow-2xl
                  transition-all duration-300 ease-in-out transform-gpu will-change-transform
                  bg-gray-800 flex items-center justify-center // Cor de fundo para as partes vazias

                  // Definindo uma altura fixa e deixando a largura ser controlada pelo keen-slider e aspectRatio
                  h-[380px] md:h-[480px] lg:h-[580px] // Altura responsiva
                  aspect-w-3 aspect-h-4 // TailwindCSS v3+ para proporção (ex: para retrato 3:4)
                                        // Ajuste conforme a proporção real das suas imagens (ex: 4:3, 16:9, 1:1)

                  ${
                    isActive
                      ? 'opacity-100 z-30' // Imagem ativa: opacidade total
                      : 'opacity-70 blur-[1px] z-20' // Imagens laterais: opaca, leve blur
                  }
                `}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover" // object-cover para preencher o contêiner
                  loading="lazy"
                />
              </div>

              {/* Seta de navegação APENAS para o slide que está visível e é o "próximo" */}
              {slider.current && isNextPartialSlide && (
                <button
                  onClick={() => slider.current?.next()}
                  className={`
                     absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 // Posiciona sobre a borda direita
                     bg-gray-800 text-lime-400 p-3 rounded-full
                     z-50 // Acima de tudo
                     opacity-90 hover:opacity-100 transition-opacity
                     focus:outline-none focus:ring-2 focus:ring-lime-400
                     border-2 border-lime-400 // Adiciona borda
                     w-12 h-12 flex items-center justify-center // Tamanho fixo para o botão
                   `}
                  aria-label="Próxima imagem"
                >
                  &#10140; {/* Seta para a direita com um círculo */}
                </button>
              )}
            </div>
          )
        })}
      </div>
      {/* Indicadores de slide (dots) - Opcional, para feedback visual */}
      {slider.current && (
        <div className="dots flex justify-center mt-8">
          {[...Array(slider.current.track.details.slides.length).keys()].map(
            (idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    slider.current?.moveToIdx(idx)
                  }}
                  className={`
                    dot w-3 h-3 rounded-full mx-1 cursor-pointer
                    ${idx === currentSlideIdx ? 'bg-lime-400' : 'bg-gray-600'}
                  `}
                  aria-label={`Ir para a imagem ${idx + 1}`}
                ></button>
              )
            }
          )}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
