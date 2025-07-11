import { Text } from '@ui'
import LOGOTYPE from '/svgs/LOGOTYPE.svg'

const logo = LOGOTYPE

const Footer = () => {
  return (
    <footer className="py-20">
      <div>
        <Text size="xs">
          2025© parcer. Todos os direitos reservados.
          <br />
          51.322.794/0001-40
        </Text>
      </div>

      {/* Estatística com imagem e texto */}
      <div className="flex items-center justify-center p-4">
        <img src={logo} alt="logo parcer" className="W-5 h-5  object-contain" />
      </div>
    </footer>
  )
}
export default Footer
