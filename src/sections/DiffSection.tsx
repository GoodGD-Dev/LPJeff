import React from 'react'
import Title from '@ui/Title'
import Card from '@components/Card'
import XIcon from '@ui/Svgs'

interface SectionDiffProps {
  className?: string
}

const SectionDiff: React.FC<SectionDiffProps> = ({ className = '' }) => {
  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16 ${className}`}>
      {/* Título principal */}
      <div className="text-center mb-8">
        <Title as="h1" size="lg" align="center" color="#ffffff">
          <span className="font-semibold">Sua marca opera</span> por acaso ou
          por intenção?
        </Title>
      </div>

      {/* Cards de comparação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-4xl mx-auto">
        {/* Card Dark - Marca por acaso */}
        <Card
          variant="dark"
          icon={<XIcon type="x" />}
          title="Marca por acaso"
          listItems={[
            'Baseada em "achismos" e tendências.',
            'Copia dos concorrentes.',
            'O design é apenas decoração.'
          ]}
          description={
            <>
              O resultado?
              <br />
              Atrai curiosos e gera desconfiança.
            </>
          }
        />

        {/* Card Light - Marca com intenção */}
        <Card
          variant="light"
          icon={<XIcon type="check" />}
          title="Marca com intenção"
          listItems={[
            'Baseada em estratégia.',
            'É autêntica e única.',
            'O design é uma ferramenta de vendas.'
          ]}
          description={
            <>
              O resultado?
              <br />
              Atrai clientes ideais e gera confiança.
            </>
          }
        />
      </div>
    </section>
  )
}

export default SectionDiff
