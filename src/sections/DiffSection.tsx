import React from 'react'
import Title from '@ui/Title'
import Card from '@/ui/Card'
import XIcon from '@ui/Svgs'

const SectionDiff: React.FC<SectionDiffProps> = ({
  className = '',
  sectionTitle,
  cardDarkTitle,
  cardDarkListItems,
  cardDarkDescription,
  cardLightTitle,
  cardLightListItems,
  cardLightDescription
}) => {
  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16 ${className}`}>
      {/* Título principal */}
      <div className="text-center mb-8">
        <Title as="h1" size="lg" align="center" color="#ffffff">
          {sectionTitle}
        </Title>
      </div>

      {/* Cards de comparação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-4xl mx-auto">
        {/* Card Dark*/}
        <Card
          variant="dark"
          icon={<XIcon type="x" />}
          title={cardDarkTitle}
          listItems={cardDarkListItems}
          description={cardDarkDescription}
        />

        {/* Card Light*/}
        <Card
          variant="light"
          icon={<XIcon type="check" />}
          title={cardLightTitle}
          listItems={cardLightListItems}
          description={cardLightDescription}
        />
      </div>
    </section>
  )
}

export default SectionDiff
