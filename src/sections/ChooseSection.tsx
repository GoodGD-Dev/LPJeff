import React from 'react'
import Title from '@ui/Title'
import Card from '@components/Card'
import XIcon from '@ui/Svgs'

interface ChooseSectionProps {
  className?: string
}

const ChooseSection: React.FC<ChooseSectionProps> = ({ className = '' }) => {
  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16 ${className}`}>
      {/* Título principal */}
      <div className="text-center mb-8">
        <Title as="h1" size="lg" align="center" color="#ffffff">
          <span className="font-semibold">Sua marca opera</span> por acaso ou
          por intenção?
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center max-w-4xl mx-auto">
        <Card
          variant="dark"
          icon={<XIcon type="x" />}
          title="Freelancer"
          text="R$ 600"
          listItems={[
            'Foco no logo barato',
            'Processo superficial',
            'Resultado amador'
          ]}
        />

        <Card
          variant="light"
          icon={<XIcon type="check" />}
          title="parcer"
          text="R$ 12.0000"
          listItems={[
            'Foco em estrategia e ROI',
            'Processo de imersao',
            'Resultado profissional'
          ]}
        />

        <Card
          variant="dark"
          icon={<XIcon type="x" />}
          title="Agencia Famosa"
          text="+R$ 50.000"
          listItems={[
            'Foco em premios',
            'Processo burocartico',
            'Altissimo custo'
          ]}
        />
      </div>
    </section>
  )
}

export default ChooseSection
