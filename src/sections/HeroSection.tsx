import React from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'

interface HeroProps {
  heroImage?: string
  statsImage?: string
  className?: string
}

const Hero: React.FC<HeroProps> = ({
  heroImage,
  statsImage,
  className = ''
}) => {
  return (
    <section className={`w-full max-w-4xl mx-auto px-4 py-16 ${className}`}>
      {/* Imagem centralizada */}
      <div className="flex justify-center mb-8">
        <img
          src={heroImage}
          alt="Imagem hero"
          className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Título principal */}
      <div className="mb-8">
        <Title as="h1" align="center">
          Marcas por acaso competem por preço.
        </Title>
        <Title as="span" bold align="center" className="block mt-2">
          Marcas com intenção vendem valor.
        </Title>
      </div>

      {/* Texto descritivo */}
      <div className="mb-10">
        <Text size="lg" align="center" color="rgba(255, 255, 255, 0.7)">
          Nós construímos a identidade visual estratégica que posiciona seu
          negócio como a escolha óbvia no seu mercado.
        </Text>
      </div>

      {/* Estatística com imagem e texto */}
      <div className="flex items-center justify-center gap-2">
        <img
          src={statsImage}
          alt="Ícone de empresas"
          className="w-10 h-4  object-contain"
        />
        <Text as="span" size="xs" color="rgba(255, 255, 255, 0.7)">
          +72 empresas atendidas
        </Text>
      </div>
    </section>
  )
}

export default Hero
