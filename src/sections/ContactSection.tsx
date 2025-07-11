import React, { ReactNode } from 'react'
import Title from '@ui/Title'
import Text from '@ui/Text'
import Form from '@/components/Form'
import { ContactProps } from '@/types'

const Contact: React.FC<ContactProps> = ({
  sectionTitle,
  descriptionText,
  fields,
  submitButtonText,
  onSubmit,
  formTitle,
  buttonProps,
  formChildren,
  security,
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
        <Text align="center" color="">
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

      <div className="py-8">
        <Text align="center" size="xs">
          {security}
        </Text>
      </div>
    </>
  )
}

export default Contact
