import React from 'react'
import Title from '@ui/Title'
import Card from '@components/Card'
import XIcon from '@ui/Svgs'

const ChooseSection: React.FC<ChooseSectionProps> = ({
  className = '',
  sectionTitle,
  cardsData
}) => {
  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16 ${className}`}>
      {/* Título principal da seção */}
      <div className="text-center mb-8">
        <Title as="h1" size="lg" align="center" color="#ffffff">
          {sectionTitle} {/* Usa a prop aqui */}
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center max-w-4xl mx-auto">
        {/* Mapeia sobre o array cardsData para renderizar os Cards */}
        {cardsData.map((card, index) => (
          <Card
            key={index} // Use uma key única, 'id' do card seria melhor se disponível
            variant={card.variant}
            icon={<XIcon type={card.iconType} />} // Passa o tipo do ícone
            title={card.title}
            text={card.text}
            listItems={card.listItems}
          />
        ))}
      </div>
    </section>
  )
}

export default ChooseSection
