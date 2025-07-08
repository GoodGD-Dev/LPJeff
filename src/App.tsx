import Hero from './sections/HeroSection'
import imgHero from './assets/images/Simbolo3d.png'
import logosImage from './assets/images/logo-de-empresas 1.png'
import SectionDiff from './sections/DiffSection'
import VideoSection from './sections/VideoSection'
import BrandIntentionSection from './sections/BrandSection'
import VideoCarouselSection from './sections/VideoCarouselSection'

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
    </>
  )
}

export default App
