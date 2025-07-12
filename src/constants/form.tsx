import { EmailFormConfig, FormField } from '@types'
import { Icon } from '@ui'

export const emailConfig: EmailFormConfig = {
  type: 'email',
  recipientEmail: 'contato@seusite.com',
  emailSubject: 'Novo contato do formulário'
}

export const myFormFields: FormField[] = [
  {
    name: 'name',
    label: '',
    type: 'text',
    placeholder: 'Seu nome completo',
    initialValue: '',
    variant: 'default'
  },
  {
    name: 'email',
    label: '',
    type: 'email',
    placeholder: 'Seu melhor e-mail',
    initialValue: '',
    variant: 'default'
  },
  {
    name: 'whatsapp',
    label: '',
    type: 'text',
    placeholder: 'Seu WhatsApp com DDD',
    initialValue: '',
    variant: 'default'
  },
  {
    name: 'instagram',
    label: '',
    type: 'text',
    placeholder: '@ do Instagram da empresa',
    initialValue: '',
    variant: 'default'
  },
  {
    name: 'challengeDescription',
    label: '',
    type: 'textarea',
    placeholder:
      'O maior desafio que sua empresa enfrenta que faz você estar aqui hoje...',
    initialValue: '',
    variant: 'larger'
  }
]

export const formBtn = {
  text: 'Enviar e agendar diagnóstico',
  props: {
    bgColor: '#D9FF85',
    textColor: '#000000',
    icon: <Icon type="phone" />
  }
}

export const handleMyFormSubmit = (data: Record<string, string>) => {
  console.log('Dados do formulário submetidos:', data)
  alert('Formulário enviado com sucesso! Verifique o console para os dados.')
  console.log(`Nome: ${data.name}`)
  console.log(`Email: ${data.email}`)
  console.log(`WhatsApp: ${data.whatsapp}`)
  console.log(`Instagram: ${data.instagram}`)
  console.log(`Desafio: ${data.challengeDescription}`)
}
