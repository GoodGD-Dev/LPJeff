import React, { ReactNode } from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'
import Accordion from '@/components/Accordion'
import { DeliverablesProps } from '@/types'

const Deliverables: React.FC<DeliverablesProps> = ({
  className = '',
  sectionTitle,
  descriptionText,
  accordionItems
}) => {
  return (
    <>
      {/* Título principal */}
      <div className="mb-8">
        <Title as="h1" align="center">
          {sectionTitle}
        </Title>
      </div>
      {/* Texto descritivo */}
      <div className="mb-10">
        <Text align="center">{descriptionText}</Text>
      </div>
      <Accordion items={accordionItems} />
    </>
  )
}

export default Deliverables
