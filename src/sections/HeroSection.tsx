import React from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'
import { HeroProps } from '@/types'

const Hero: React.FC<HeroProps> = ({
  heroImage,
  statsImage,
  className = '',
  sectionTitle,
  descriptionText
}) => {
  return (
    <>
      {/* Imagem centralizada */}
      <div className="flex justify-center mb-8">
        <img
          src={heroImage}
          alt="Imagem hero"
          className="max-w-md h-64 w-60 object-fit rounded-lg"
        />
      </div>

      {/* Título principal */}
      <div className="mb-8">
        <Title>{sectionTitle}</Title>
      </div>

      {/* Texto descritivo */}
      <div className="mb-10">
        <Text>{descriptionText}</Text>
      </div>

      {/* Estatística com imagem e texto */}
      <div className="flex items-center justify-center gap-2">
        <img
          src={statsImage}
          alt="Ícone de empresas"
          className="w-10 h-4  object-contain"
        />
        <Text as="span" size="xs">
          +72 empresas atendidas
        </Text>
      </div>
    </>
  )
}

export default Hero
