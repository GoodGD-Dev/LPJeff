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
import Accordion from '../components/Accordion'
import Icon from '@ui/Svgs'
import ProcessStepsSection from '../sections/ProcessStepsSection'
import InvestSection from '@/sections/InvestSection'

const heroImage = imgHero
const statsImage = logosImage

const moneyImage = imgMoney

const processSteps = [
  'Entrevistas Internas',
  'Análise de Concorrentes',
  'Pesquisa de Público',
  'Definição Estratégica',
  'Desenvolvimento Visual',
  'Ampliação Visual',
  'Refinamento Visual',
  'Sintetização do Manual',
  'Organização e Entrega',
  'Revisão Final',
  'Lançamento',
  'Feedback e Iteração',
  'Expansão de Recursos',
  'Monitoramento Contínuo'
]

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
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Editar Perfil
        </button>
      </div>
    )
  },
  {
    title: 'Logotipo Feito a Mão',
    icon: <Icon type="pencil-ruler" />,
    content: (
      <div className="p-4">
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Receber notificações por email
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Modo escuro
          </label>
        </div>
      </div>
    )
  },
  {
    title: 'Paleta de Cores Selecionada',
    icon: <Icon type="color-picker" />,
    content: (
      <div className="p-4">
        <p>Entre em contato conosco:</p>
        <ul className="mt-2 space-y-1">
          <li>Email: suporte@exemplo.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>WhatsApp: (11) 9876-5432</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Tipografia Curada',
    icon: <Icon type="letter-spacing" />,
    content: (
      <div className="p-4">
        <p>Entre em contato conosco:</p>
        <ul className="mt-2 space-y-1">
          <li>Email: suporte@exemplo.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>WhatsApp: (11) 9876-5432</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Elementos Gráficos Exclusivos',
    icon: <Icon type="classify" />,
    content: (
      <div className="p-4">
        <p>Entre em contato conosco:</p>
        <ul className="mt-2 space-y-1">
          <li>Email: suporte@exemplo.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>WhatsApp: (11) 9876-5432</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Diretriz Fotográfica com IA',
    icon: <Icon type="ai" />,
    content: (
      <div className="p-4">
        <p>Entre em contato conosco:</p>
        <ul className="mt-2 space-y-1">
          <li>Email: suporte@exemplo.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>WhatsApp: (11) 9876-5432</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Manual de Marca Online',
    icon: <Icon type="box" />,
    content: (
      <div className="p-4">
        <p>Entre em contato conosco:</p>
        <ul className="mt-2 space-y-1">
          <li>Email: suporte@exemplo.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>WhatsApp: (11) 9876-5432</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Kit de Lançamento',
    icon: <Icon type="certificate2" />,
    content: (
      <div className="p-4">
        <p>Entre em contato conosco:</p>
        <ul className="mt-2 space-y-1">
          <li>Email: suporte@exemplo.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>WhatsApp: (11) 9876-5432</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Certificado de Anterioridade',
    icon: <Icon type="certificate" />,
    content: (
      <div className="p-4">
        <p>Entre em contato conosco:</p>
        <ul className="mt-2 space-y-1">
          <li>Email: suporte@exemplo.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>WhatsApp: (11) 9876-5432</li>
        </ul>
      </div>
    )
  }
]

function Home() {
  return (
    <>
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
      <SectionDiff
        sectionTitle={
          <>
            <span className="font-semibold">Sua marca opera</span> por acaso ou
            por intenção?
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
            Histórias de <span className="font-semibold">quem escolheu</span> a
            intenção
          </>
        }
      />
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
                alt: 'Imagem 1 do primeiro carousel',
                title: 'Primeira imagem'
              },
              {
                id: 2,
                src: 'https://picsum.photos/id/1025/600/400',
                alt: 'Imagem 2 do primeiro carousel',
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
                alt: 'Imagem 1 do primeiro carousel',
                title: 'Primeira imagem'
              },
              {
                id: 2,
                src: 'https://picsum.photos/id/1069/600/400',
                alt: 'Imagem 2 do primeiro carousel',
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
                alt: 'Imagem 1 do primeiro carousel',
                title: 'Primeira imagem'
              },
              {
                id: 2,
                src: 'https://picsum.photos/id/1041/600/400',
                alt: 'Imagem 2 do primeiro carousel',
                title: 'Segunda imagem'
              }
            ]
          }
        ]}
        sectionTitle={
          <>
            Resultados de <span className="font-semibold">quem escolheu</span> a
            intenção
          </>
        }
      />
      <ChooseSection
        sectionTitle={
          <>
            A <span className="font-semibold">escolha inteligente</span> para o
            seu momento
          </>
        }
        cardsData={[
          {
            variant: 'dark',
            iconType: 'x', // 'x' para o ícone de 'X'
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
            iconType: 'check', // 'check' para o ícone de 'Check'
            title: 'parcer',
            text: 'R$ 12.000', // Corrigi o valor
            listItems: [
              'Foco em estrategia e ROI',
              'Processo de imersao',
              'Resultado profissional'
            ]
          },
          {
            variant: 'dark',
            iconType: 'x',
            title: 'Agencia Famosa',
            text: '+R$ 50.000',
            listItems: [
              'Foco em premios',
              'Processo burocartico',
              'Altissimo custo'
            ]
          }
        ]}
      />
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
      <Accordion items={accordionItems} />
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
    </>
  )
}

export default Home
