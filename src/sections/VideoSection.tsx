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

        <div className="w-full">
          <VideoPlayer
            videoSrc={videoSrc}
            thumbnail={thumbnail}
            className="max-w-4xl mx-auto"
            title="Vídeo Demonstrativo"
            aspectRatio="1:1"
            isPlaying={false} // Mantém falso, o clique na thumbnail inicia
            isMuted={true} // Definir como TRUE para que o play no primeiro clique não seja bloqueado por políticas de navegador
            showControls={true} // Definir como TRUE para que os controles apareçam após o play
          />
        </div>
      </div>
    </section>
  )
}

export default VideoSection

/*
--- EXEMPLO DE USO ATUALIZADO DO VideoSection ---

PROPS OBRIGATÓRIAS:
- videoSrc: string - URL/caminho do vídeo a ser exibido.
- thumbnail: string - URL da thumbnail do vídeo (aparece antes do primeiro play).

EXEMPLOS:

// Com vídeo e thumbnail (usando os novos comportamentos do VideoPlayer)
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
- Título da Seção: "A intenção por trás de cada traço"
- Estilo do Título: h2, md, com parte em bold
- Layout da Seção: `section` com padding vertical (`py-16`), centralizado (`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`).
- Player de Vídeo:
  - `isPlaying={false}`: Inicia pausado.
  - `isMuted={true}`: Inicia mudo.
  - `showControls={true}`: Controles customizados sempre visíveis.
  - `title="Vídeo Demonstrativo"`: Título exibido acima do player.
  - `aspectRatio="16:9"`: Define a proporção do vídeo.

Para customizar o título ou layout da `VideoSection`, edite diretamente no código do componente.
Para customizar o comportamento de reprodução ou mute do `VideoPlayer` dentro desta seção, ajuste as props `isPlaying`, `isMuted` e `showControls` passadas para ele.
*/
