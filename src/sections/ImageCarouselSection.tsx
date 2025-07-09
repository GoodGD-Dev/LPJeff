import React from 'react'
import Title from '@ui/Title'
import ImageCarousel from '@components/ImageCarousel'

const ImageCarouselSection: React.FC<ImageCarouselSectionProps> = ({
  sectionTitle,
  carousels,
  sectionClassName = '',
  spacing = 'default'
}) => {
  // Mapeamento de espaçamentos entre carousels
  const spacingClasses = {
    default: 'space-y-1', // 4px
    sm: 'space-y-8', // 32px
    md: 'space-y-12', // 48px
    lg: 'space-y-16', // 64px
    xl: 'space-y-20' // 80px
  }

  return (
    <section className={`w-full py-2 lg:py-16 ${sectionClassName}`}>
      <div className="container mx-auto">
        <div className="mb-8">
          <Title as="h1" align="center">
            {sectionTitle}
          </Title>
        </div>

        {/* Carousels */}
        <div className={`${spacingClasses[spacing]}`}>
          {carousels.map((carousel) => (
            <div key={carousel.id} className="w-full">
              <ImageCarousel
                images={carousel.images}
                showModal={carousel.showModal}
                autoPlay={carousel.autoPlay}
                autoPlayInterval={carousel.autoPlayInterval}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImageCarouselSection

/**
 * === EXEMPLO DE USO ===
 *
 * const carouselData = [
 *   {
 *     id: 'carousel-1',
 *     images: [
 *       {
 *         id: 1,
 *         src: '/images/carousel1/image1.jpg',
 *         alt: 'Imagem 1 do primeiro carousel',
 *         title: 'Primeira imagem'
 *       },
 *       {
 *         id: 2,
 *         src: '/images/carousel1/image2.jpg',
 *         alt: 'Imagem 2 do primeiro carousel',
 *         title: 'Segunda imagem'
 *       }
 *     ],
 *     showModal: true,
 *     autoPlay: false
 *   },
 *   {
 *     id: 'carousel-2',
 *     images: [
 *       {
 *         id: 3,
 *         src: '/images/carousel2/image1.jpg',
 *         alt: 'Imagem 1 do segundo carousel',
 *         title: 'Terceira imagem'
 *       },
 *       {
 *         id: 4,
 *         src: '/images/carousel2/image2.jpg',
 *         alt: 'Imagem 2 do segundo carousel',
 *         title: 'Quarta imagem'
 *       }
 *     ],
 *     showModal: true,
 *     autoPlay: true,
 *     autoPlayInterval: 4000
 *   },
 *   {
 *     id: 'carousel-3',
 *     images: [
 *       {
 *         id: 5,
 *         src: '/images/carousel3/image1.jpg',
 *         alt: 'Imagem 1 do terceiro carousel'
 *       }
 *     ],
 *     showModal: false
 *   },
 *   {
 *     id: 'carousel-4',
 *     images: [
 *       {
 *         id: 6,
 *         src: '/images/carousel4/image1.jpg',
 *         alt: 'Imagem 1 do quarto carousel'
 *       }
 *     ]
 *   }
 * ]
 *
 * // Uso básico
 * <ImageCarouselSection
 *   title="Galeria de Imagens"
 *   carousels={carouselData}
 * />
 *
 * // Com props customizadas para o título
 * <ImageCarouselSection
 *   title="Minha Galeria"
 *   titleProps={{
 *     as: 'h1',
 *     size: 'xl',
 *     color: '#3b82f6',
 *     uppercase: true,
 *     align: 'left'
 *   }}
 *   carousels={carouselData}
 *   spacing="lg"
 * />
 *
 * // Com classe personalizada
 * <ImageCarouselSection
 *   title="Portfólio"
 *   carousels={carouselData}
 *   sectionClassName="bg-gray-100"
 *   spacing="xl"
 * />
 */
