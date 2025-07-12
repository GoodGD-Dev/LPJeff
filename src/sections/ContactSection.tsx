import React from 'react'
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
  formClassName = '',
  submitConfig
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
        submitConfig={submitConfig}
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

// Exemplo de uso com WhatsApp:
/*
const contactProps = {
  sectionTitle: "Entre em Contato",
  descriptionText: "Preencha o formulário e envie via WhatsApp",
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome',
      placeholder: 'Digite seu nome'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Digite seu email'
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Mensagem',
      placeholder: 'Digite sua mensagem'
    }
  ],
  submitButtonText: "Enviar via WhatsApp",
  submitConfig: {
    type: 'whatsapp',
    phoneNumber: '5511999999999', // Número com código do país
    messageTemplate: 'Olá! Meu nome é {name}, meu email é {email} e gostaria de falar sobre: {message}'
    // Ou deixe sem messageTemplate para usar o formato padrão
  },
  security: "Seus dados estão seguros conosco"
}
*/
