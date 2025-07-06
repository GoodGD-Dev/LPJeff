import React from 'react'
import Title from '@ui/Title'
import VideoPlayer from '@ui/VideoModal'

interface VideoSectionProps {
  videoSrc: string
  thumbnail: string
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoSrc, thumbnail }) => {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da Section */}
        <div className="mb-8 md:mb-12">
          <Title as="h2" size="md">
            A intenção por trás
            <br />
            de
            <Title as="span" bold>
              {' '}
              cada traço
            </Title>
          </Title>
        </div>

        {/* Video Player */}
        <div className="w-full">
          <VideoPlayer
            videoSrc={videoSrc}
            thumbnail={thumbnail}
            className="max-w-4xl mx-auto"
          />
        </div>
      </div>
    </section>
  )
}

export default VideoSection

/*
=== EXEMPLO DE USO ===

PROPS OBRIGATÓRIAS:
- videoSrc: string - URL/caminho do vídeo
- thumbnail: string - URL da thumbnail do vídeo

EXEMPLOS:

// Com vídeo e thumbnail
<VideoSection
  videoSrc="https://exemplo.com/video.mp4"
  thumbnail="https://exemplo.com/thumb.jpg"
/>

// Com arquivos locais
<VideoSection
  videoSrc="/videos/demo.mp4"
  thumbnail="/images/thumb.jpg"
/>

// Com placeholders para teste
<VideoSection
  videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  thumbnail="https://picsum.photos/1280/720"
/>

CONFIGURAÇÃO FIXA:
- Título: "Assista ao Vídeo Demonstrativo"
- Estilo: h2, xl, cor #D9FF85, bold
- Layout: Section com py-16, bg-gray-900
- Container: max-w-6xl centralizado

Para customizar o título ou layout, edite diretamente no código do componente.
*/
