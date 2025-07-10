import React from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'
import { ButtonProps } from '@/types/ui'
import Form from '@/components/Form'
import { FormField } from '@/types'

interface FormSectionProps {
  sectionTitle: string
  descriptionText: string
  fields: FormField[]
  submitButtonText: string
  onSubmit: (formData: Record<string, string>) => void
  formTitle?: string
  buttonProps?: Partial<ButtonProps>
  formChildren?: React.ReactNode
  className?: string
  formClassName?: string
}

const FormSection: React.FC<FormSectionProps> = ({
  sectionTitle,
  descriptionText,
  fields,
  submitButtonText,
  onSubmit,
  formTitle,
  buttonProps,
  formChildren,
  className = '',
  formClassName = ''
}) => {
  return (
    <>
      {/* Main Section Title */}
      <div className="mb-8">
        <Title as="h1" align="center">
          {sectionTitle}
        </Title>
      </div>

      {/* Descriptive Text */}
      <div className="mb-10">
        <Text size="lg" align="center" color="">
          {descriptionText}
        </Text>
      </div>

      {/* Form */}
      <Form
        title={formTitle}
        fields={fields}
        submitButtonText={submitButtonText}
        onSubmit={onSubmit}
        buttonProps={buttonProps}
        className={formClassName}
      >
        {formChildren}
      </Form>
    </>
  )
}

export default FormSection
