import React from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'
import TimelineList from '@/components/TimelineList'

const ProcessStepsSection: React.FC<ProcessStepsSectionProps> = ({
  sectionTitle,
  descriptionText,
  timelineItems,
  className = ''
}) => {
  return (
    <section className={`w-full max-w-4xl mx-auto px-4 py-16 ${className}`}>
      {/* Título principal */}
      <div className="mb-8">
        <Title as="h1" align="center">
          {sectionTitle}
        </Title>
      </div>
      {/* Texto descritivo */}
      <div className="mb-10">
        <Text size="lg" align="center" color="rgba(255, 255, 255, 0.7)">
          {descriptionText}
        </Text>
      </div>
      {/* TimelineList com items passados via prop */}
      <TimelineList items={timelineItems} />
    </section>
  )
}

export default ProcessStepsSection
