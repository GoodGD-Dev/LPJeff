import Hero from './sections/HeroSection'
import imgHero from './assets/images/Simbolo3d.png'
import logosImage from './assets/images/logo-de-empresas 1.png'
import SectionDiff from './sections/DiffSection'
import VideoSection from './sections/VideoSection'
import BrandIntentionSection from './sections/BrandSection'
import VideoCarouselSection from './sections/VideoCarouselSection'
import ImageCarousel from '@components/ImageCarousel'
import ImageCarouselSection from './sections/ImageCarouselSection'

const heroImage = imgHero
const statsImage = logosImage

const VIDEOS = [
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
]

interface ImageItem {
  id: number | string
  src: string
  alt: string
}

const images: ImageItem[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf96132e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Praia paradisíaca com coqueiros'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Montanhas nevadas ao pôr do sol'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1510414705387-a2f022877a11?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Cidade iluminada à noite com rio'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1506744038136-462a09665926?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Floresta densa com neblina'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Cachoeira em meio à natureza exuberante'
  }
]

const carouselData = [
  {
    id: 'carousel-1',
    images: [
      {
        id: 1,
        src: '/images/carousel1/image1.jpg',
        alt: 'Imagem 1 do primeiro carousel',
        title: 'Primeira imagem'
      },
      {
        id: 2,
        src: '/images/carousel1/image2.jpg',
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
        src: '/images/carousel1/image1.jpg',
        alt: 'Imagem 1 do primeiro carousel',
        title: 'Primeira imagem'
      },
      {
        id: 2,
        src: '/images/carousel1/image2.jpg',
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
        src: '/images/carousel1/image1.jpg',
        alt: 'Imagem 1 do primeiro carousel',
        title: 'Primeira imagem'
      },
      {
        id: 2,
        src: '/images/carousel1/image2.jpg',
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
        src: '/images/carousel1/image1.jpg',
        alt: 'Imagem 1 do primeiro carousel',
        title: 'Primeira imagem'
      },
      {
        id: 2,
        src: '/images/carousel1/image2.jpg',
        alt: 'Imagem 2 do primeiro carousel',
        title: 'Segunda imagem'
      }
    ]
  }
]

function App() {
  return (
    <>
      <Hero heroImage={heroImage} statsImage={statsImage} />
      <SectionDiff />
      <VideoSection
        thumbnail="https://picsum.photos/1280/720"
        videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
      <BrandIntentionSection />
      <VideoCarouselSection videos={VIDEOS} />
      <ImageCarouselSection carousels={carouselData} title="Test" />
    </>
  )
}

export default App
