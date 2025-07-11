import React from 'react'
import Title from '@ui/Title'
import Card from '@/ui/Card'
import XIcon from '@ui/Svgs'
import { ComparisonProps } from '@/types'

const Comparison: React.FC<ComparisonProps> = ({
  className = '',
  sectionTitle,
  cardsData
}) => {
  return (
    <>
      {/* Título principal da seção */}
      <div className="text-center mb-8">
        <Title as="h1" size="lg">
          {sectionTitle}
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center max-w-4xl mx-auto">
        {/* Mapeia sobre o array cardsData para renderizar os Cards */}
        {cardsData.map((card, index) => (
          <Card
            key={index}
            variant={card.variant}
            icon={<XIcon type={card.iconType} />}
            title={card.title}
            text={card.text}
            listItems={card.listItems}
          />
        ))}
      </div>
    </>
  )
}

export default Comparison
