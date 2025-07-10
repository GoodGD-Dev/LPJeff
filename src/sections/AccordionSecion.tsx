import React, { ReactNode } from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'
import Accordion from '@/components/Accordion'
import { AccordionSectionProps } from '@/types'

const AccordionSection: React.FC<AccordionSectionProps> = ({
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
        <Text size="lg" align="center">
          {descriptionText}
        </Text>
      </div>
      <Accordion items={accordionItems} />
    </>
  )
}

export default AccordionSection
