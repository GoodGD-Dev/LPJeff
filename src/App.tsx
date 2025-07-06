import Hero from './sections/HeroSection'
import imgHero from './assets/images/Simbolo3d.png'
import logosImage from './assets/images/logo-de-empresas 1.png'
import SectionDiff from './sections/DiffSection'
import VideoSection from './sections/VideoSection'
import BrandIntentionSection from './sections/BrandSection'

const heroImage = imgHero
const statsImage = logosImage

const videos = [
  {
    id: '1',
    thumbnail: 'https://picsum.photos/1280/720',
    videoSrc:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'História da Maria'
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/1280/720',
    videoSrc:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'História da Maria'
  },
  {
    id: '3',
    thumbnail: 'https://picsum.photos/1280/720',
    videoSrc:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'História da Maria'
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
    </>
  )
}

export default App
