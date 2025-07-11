import React from 'react'
import Title from '@ui/Title'
import Card from '@/ui/Card'
import XIcon from '@ui/Svgs'
import { DifferenceProps } from '@/types'

const Difference: React.FC<DifferenceProps> = ({
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
    <>
      {/* Título principal */}
      <div className="text-center mb-8">
        <Title>{sectionTitle}</Title>
      </div>

      {/* Cards de comparação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center max-w-4xl mx-auto">
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
    </>
  )
}

export default Difference
