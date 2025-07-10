import React from 'react'
import Hero from '../sections/HeroSection'
import imgHero from '../assets/images/Simbolo3d.png'
import logosImage from '../assets/images/logo-de-empresas 1.png'
import imgMoney from '../assets/images/money.svg'
import SectionDiff from '../sections/DiffSection'
import VideoSection from '../sections/VideoSection'
import BrandIntentionSection from '../sections/BrandSection'
import VideoCarouselSection from '../sections/VideoCarouselSection'
import ImageCarouselSection from '../sections/ImageCarouselSection'
import ChooseSection from '../sections/ChooseSection'
import Icon from '@ui/Svgs'
import ProcessStepsSection from '../sections/ProcessStepsSection'
import InvestSection from '@/sections/InvestSection'
import AccordionSection from '@/sections/AccordionSecion'
import { FormField } from '@/types'
import FormSection from '@/sections/FormSection'
import Button from '@/ui/Button'

const heroImage = imgHero
const statsImage = logosImage
const moneyImage = imgMoney

const myFormFields: FormField[] = [
  {
    name: 'name',
    label: '',
    type: 'text',
    placeholder: 'Digite seu nome',
    initialValue: '',
    variant: 'default'
  },
  {
    name: 'email',
    label: '',
    type: 'email',
    placeholder: 'exemplo@dominio.com',
    initialValue: '',
    variant: 'default'
  },
  {
    name: 'whatsapp',
    label: '',
    type: 'text',
    placeholder: '(XX) 9XXXX-XXXX',
    initialValue: '',
    variant: 'default'
  },
  {
    name: 'instagram',
    label: '',
    type: 'text',
    placeholder: '@seuperfil',
    initialValue: '',
    variant: 'default'
  },
  {
    name: 'challengeDescription',
    label: '',
    type: 'textarea',
    placeholder:
      'Descreva em detalhes o que mais te impede de crescer ou se destacar...',
    initialValue: '',
    variant: 'larger'
  }
]

const handleMyFormSubmit = (data: Record<string, string>) => {
  console.log('Dados do formulário submetidos:', data)
  alert('Formulário enviado com sucesso! Verifique o console para os dados.')
  console.log(`Nome: ${data.name}`)
  console.log(`Email: ${data.email}`)
  console.log(`WhatsApp: ${data.whatsapp}`)
  console.log(`Instagram: ${data.instagram}`)
  console.log(`Desafio: ${data.challengeDescription}`)
}

const accordionItems = [
  {
    title: 'Estratégia e Posicionamento',
    icon: <Icon type="chess" />,
    content: (
      <div className="p-4">
        <p>
          Um diagnóstico profundo que define seu lugar único no mercado, a
          personalidade da sua marca e a mensagem que vai atrair os clientes
          certos para sua empresa.
        </p>
      </div>
    )
  },
  {
    title: 'Logotipo Feito a Mão',
    icon: <Icon type="pencil-ruler" />,
    content: (
      <div className="p-4">
        <p>
          Criação artesanal e exclusiva do seu logotipo, desenvolvido
          especificamente para sua marca com técnicas profissionais de design.
        </p>
      </div>
    )
  },
  {
    title: 'Paleta de Cores Selecionada',
    icon: <Icon type="color-picker" />,
    content: (
      <div className="p-4">
        <p>
          Seleção estratégica de cores que transmitem os valores da sua marca e
          conectam com seu público-alvo de forma psicológica.
        </p>
      </div>
    )
  },
  {
    title: 'Tipografia Curada',
    icon: <Icon type="letter-spacing" />,
    content: (
      <div className="p-4">
        <p>
          Escolha cuidadosa de fontes que complementam sua identidade visual e
          garantem legibilidade em todos os pontos de contato.
        </p>
      </div>
    )
  },
  {
    title: 'Elementos Gráficos Exclusivos',
    icon: <Icon type="classify" />,
    content: (
      <div className="p-4">
        <p>
          Desenvolvimento de elementos visuais únicos como padrões, ícones e
          ilustrações que fortalecem a identidade da sua marca.
        </p>
      </div>
    )
  },
  {
    title: 'Diretriz Fotográfica com IA',
    icon: <Icon type="ai" />,
    content: (
      <div className="p-4">
        <p>
          Orientações específicas sobre estilo fotográfico e uso de inteligência
          artificial para manter consistência visual em todas as suas imagens.
        </p>
      </div>
    )
  },
  {
    title: 'Manual de Marca Online',
    icon: <Icon type="box" />,
    content: (
      <div className="p-4">
        <p>
          Documento digital completo com todas as diretrizes de uso da sua
          marca, facilitando a aplicação correta em qualquer situação.
        </p>
      </div>
    )
  },
  {
    title: 'Kit de Lançamento',
    icon: <Icon type="certificate2" />,
    content: (
      <div className="p-4">
        <p>
          Conjunto de materiais prontos para o lançamento da sua nova
          identidade, incluindo posts, templates e materiais de divulgação.
        </p>
      </div>
    )
  },
  {
    title: 'Certificado de Anterioridade',
    icon: <Icon type="certificate" />,
    content: (
      <div className="p-4">
        <p>
          Verificação legal que garante a originalidade da sua marca e protege
          contra possíveis conflitos de propriedade intelectual.
        </p>
      </div>
    )
  }
]

// Home agora é um componente funcional simples que retorna as seções
// ou o conteúdo que o MainLayout espera.
// Para o seu caso, como MainLayout aceita 'sections', Home pode retornar
// um objeto com essas seções.

// Definimos uma interface para o tipo de dado que Home vai "exportar"
export interface HomePageContent {
  sections: { id: string; content: React.ReactNode }[]
}

const Home: React.FC = () => {
  const sections = [
    {
      id: 'hero',
      content: (
        <Hero
          heroImage={heroImage}
          statsImage={statsImage}
          sectionTitle={
            <>
              Marcas por acaso competem por preço.{' '}
              <span className="font-semibold">
                Marcas com intenção vendem valor.
              </span>
            </>
          }
          descriptionText={`Nós construímos a identidade visual
            estratégica que posiciona seu negócio
            como a escolha óbvia no seu mercado.`}
        />
      )
    },
    {
      id: 'difference',
      content: (
        <SectionDiff
          sectionTitle={
            <>
              <span className="font-semibold">Sua marca opera</span> por
              <br />
              acaso ou por intenção?
            </>
          }
          cardDarkTitle="Marca por acaso"
          cardDarkListItems={[
            'Baseada em "achismos" e tendências.',
            'Copia dos concorrentes.',
            'O design é apenas decoração.'
          ]}
          cardDarkDescription={
            <>
              O resultado?
              <br />
              Atrai curiosos e gera desconfiança.
            </>
          }
          cardLightTitle="Marca com intenção"
          cardLightListItems={[
            'Baseada em estratégia.',
            'É autêntica e única.',
            'O design é uma ferramenta de vendas.'
          ]}
          cardLightDescription={
            <>
              O resultado?
              <br />
              Atrai clientes ideais e gera confiança.
            </>
          }
        />
      )
    },
    {
      id: 'video',
      content: (
        <VideoSection
          thumbnail="https://picsum.photos/1280/720"
          videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          sectionTitle={
            <>
              A intenção por trás <br /> de{' '}
              <span className="font-semibold">cada traço</span>
            </>
          }
        />
      )
    },
    {
      id: 'brand-intention',
      content: (
        <BrandIntentionSection
          sectionTitle={
            <>
              O que uma marca com{' '}
              <span className="font-semibold">intenção gera:</span>
            </>
          }
          listItems={[
            {
              id: '1',
              icon: <Icon type="smile" />,
              text: 'Atrai o público que você quer\ne repele o que só busca preço'
            },
            {
              id: '2',
              icon: <Icon type="heart" />,
              text: 'Gera conexão emocional,\nnão apenas transações'
            },
            {
              id: '3',
              icon: <Icon type="flag" />,
              text: 'Justifica seu valor e te tira da guerra com a concorrência'
            },
            {
              id: '4',
              icon: <Icon type="brain" />,
              text: 'Cria uma experiência memorável em cada ponto de contato'
            },
            {
              id: '5',
              icon: <Icon type="eye" />,
              text: 'Transforma clientes em fãs e admiradores da sua marca'
            }
          ]}
        />
      )
    },
    {
      id: 'video-carousel',
      content: (
        <VideoCarouselSection
          videos={[
            {
              id: 1,
              src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video1/1280/720'
            },
            {
              id: 2,
              src: 'https://www.w3schools.com/html/movie.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video2/1280/720'
            },
            {
              id: 3,
              src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video3/1280/720'
            },
            {
              id: 4,
              src: 'https://www.w3schools.com/html/movie.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video4/1280/720'
            },
            {
              id: 5,
              src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video5/1280/720'
            },
            {
              id: 6,
              src: 'https://www.w3schools.com/html/movie.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video6/1280/720'
            },
            {
              id: 7,
              src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video7/1280/720'
            },
            {
              id: 8,
              src: 'https://www.w3schools.com/html/movie.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video8/1280/720'
            },
            {
              id: 9,
              src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              thumbnailSrc: 'https://picsum.photos/seed/video9/1280/720'
            }
          ]}
          sectionTitle={
            <>
              Histórias de <span className="font-semibold">quem escolheu</span>{' '}
              a intenção
            </>
          }
        />
      )
    },
    {
      id: 'image-carousel',
      content: (
        <ImageCarouselSection
          carousels={[
            {
              id: 'carousel-1',
              images: [
                {
                  id: 1,
                  src: 'https://picsum.photos/id/1015/600/400',
                  alt: 'Imagem 1 do primeiro carousel',
                  title: 'Primeira imagem'
                },
                {
                  id: 2,
                  src: 'https://picsum.photos/id/237/600/400',
                  alt: 'Imagem 2 do primeiro carousel',
                  title: 'Segunda imagem'
                }
              ]
            },
            {
              id: 'carousel-2',
              images: [
                {
                  id: 1,
                  src: 'https://picsum.photos/id/1003/600/400',
                  alt: 'Imagem 1 do segundo carousel',
                  title: 'Primeira imagem'
                },
                {
                  id: 2,
                  src: 'https://picsum.photos/id/1025/600/400',
                  alt: 'Imagem 2 do segundo carousel',
                  title: 'Segunda imagem'
                }
              ]
            },
            {
              id: 'carousel-3',
              images: [
                {
                  id: 1,
                  src: 'https://picsum.photos/id/1074/600/400',
                  alt: 'Imagem 1 do terceiro carousel',
                  title: 'Primeira imagem'
                },
                {
                  id: 2,
                  src: 'https://picsum.photos/id/1069/600/400',
                  alt: 'Imagem 2 do terceiro carousel',
                  title: 'Segunda imagem'
                }
              ]
            },
            {
              id: 'carousel-4',
              images: [
                {
                  id: 1,
                  src: 'https://picsum.photos/id/1059/600/400',
                  alt: 'Imagem 1 do quarto carousel',
                  title: 'Primeira imagem'
                },
                {
                  id: 2,
                  src: 'https://picsum.photos/id/1041/600/400',
                  alt: 'Imagem 2 do quarto carousel',
                  title: 'Segunda imagem'
                }
              ]
            }
          ]}
          sectionTitle={
            <>
              Resultados de <span className="font-semibold">quem escolheu</span>{' '}
              a intenção
            </>
          }
        />
      )
    },
    {
      id: 'choose',
      content: (
        <ChooseSection
          sectionTitle={
            <>
              A <span className="font-semibold">escolha inteligente</span> para
              o seu momento
            </>
          }
          cardsData={[
            {
              variant: 'dark',
              iconType: 'x',
              title: 'Freelancer',
              text: 'R$ 600',
              listItems: [
                'Foco no logo barato',
                'Processo superficial',
                'Resultado amador'
              ]
            },
            {
              variant: 'light',
              iconType: 'check',
              title: 'parcer',
              text: 'R$ 12.000',
              listItems: [
                'Foco em estratégia e ROI',
                'Processo de imersão',
                'Resultado profissional'
              ]
            },
            {
              variant: 'dark',
              iconType: 'x',
              title: 'Agência Famosa',
              text: '+R$ 50.000',
              listItems: [
                'Foco em prêmios',
                'Processo burocrático',
                'Altíssimo custo'
              ]
            }
          ]}
        />
      )
    },
    {
      id: 'process',
      content: (
        <ProcessStepsSection
          sectionTitle={
            <>
              Intencionalmente,
              <br />
              <span className="font-semibold">como funciona?</span>
            </>
          }
          descriptionText={`Não se preocupe, nós faremos todo esse
            processo chato e demorado por você.
            Seu trabalho será apenas aprovar.`}
          timelineItems={[
            'Entrevistas Internas',
            'Análise de Concorrentes',
            'Pesquisa de Público',
            'Definição Estratégica',
            'Desenvolvimento Visual',
            'Ampliação Visual',
            'Refinamento Visual',
            'Sintetização do Manual',
            'Organização e Entrega'
          ]}
        />
      )
    },
    {
      id: 'faq',
      content: (
        <AccordionSection
          sectionTitle="Perguntas Frequentes"
          descriptionText="Encontre as respostas para as suas principais dúvidas aqui."
          accordionItems={accordionItems}
        />
      )
    },
    {
      id: 'invest',
      content: (
        <InvestSection
          heroImage={moneyImage}
          sectionTitle={
            <>
              <span className="font-semibold">Intenção é um investimento.</span>
              <br />
              Acaso é um custo.
            </>
          }
          descriptionText={`Continuar com uma marca que
            está ao acaso te custa clientes
            e lucro todos os dias.`}
        />
      )
    },
    {
      id: 'contact',
      content: (
        <FormSection
          sectionTitle="Fale Conosco"
          descriptionText="Preencha o formulário abaixo para iniciarmos uma conversa estratégica sobre a sua marca."
          fields={myFormFields}
          submitButtonText="Quero Aumentar Meu Valor!"
          onSubmit={handleMyFormSubmit}
          buttonProps={{
            bgColor: '#D9FF85',
            textColor: '#000000',
            expanded: true,
            icon: <Icon type="ai" />
          }}
        />
      )
    }
  ]

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="px-6 sm:px-6 lg:px-8 gap-3"
        >
          <div className="max-w-7xl mx-auto w-full">{section.content}</div>
        </section>
      ))}
      <Button
        fixed={true}
        position="bottom-center"
        targetSection="contact"
        hideOnSection={true}
        size="md"
        icon={<Icon type="eye" />}
      >
        Ir para Contato
      </Button>
    </>
  )
}

export default Home
