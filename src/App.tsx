import Hero from './sections/HeroSection'
import imgHero from './assets/images/Simbolo3d.png'
import logosImage from './assets/images/logo-de-empresas 1.png'
import SectionDiff from './sections/DiffSection'

const heroImage = imgHero
const statsImage = logosImage

function App() {
  return (
    <>
      <Hero heroImage={heroImage} statsImage={statsImage} />
      <SectionDiff />
    </>
  )
}

export default App
