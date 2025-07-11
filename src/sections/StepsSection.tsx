import React from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'
import TimelineList from '@/components/TimelineList'
import { StepsProps } from '@/types'

const Steps: React.FC<StepsProps> = ({
  sectionTitle,
  descriptionText,
  timelineItems,
  className = ''
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
      <TimelineList items={timelineItems} />
    </>
  )
}

export default Steps
