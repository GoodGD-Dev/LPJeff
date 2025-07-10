import React from 'react'
import FormSection from '@/sections/FormSection'
import { FormField } from '@/types'
import Icon from '@/ui/Svgs'

export const TestPage = () => {
  // 1. Defina os campos do formulário
  const myFormFields: FormField[] = [
    {
      name: 'name',
      label: '',
      type: 'text',
      placeholder: 'Digite seu nome',
      initialValue: '',
      variant: 'default'
    },
    {
      name: 'email',
      label: '',
      type: 'email',
      placeholder: 'exemplo@dominio.com',
      initialValue: '',
      variant: 'default'
    },
    {
      name: 'whatsapp',
      label: '',
      type: 'text',
      placeholder: '(XX) 9XXXX-XXXX',
      initialValue: '',
      variant: 'default'
    },
    {
      name: 'instagram',
      label: '',
      type: 'text',
      placeholder: '@seuperfil',
      initialValue: '',
      variant: 'default'
    },
    {
      name: 'challengeDescription',
      label: '',
      type: 'textarea',
      placeholder:
        'Descreva em detalhes o que mais te impede de crescer ou se destacar...',
      initialValue: '',
      variant: 'larger'
    }
  ]

  // 2. Defina a função de submissão do formulário
  const handleMyFormSubmit = (data: Record<string, string>) => {
    console.log('Dados do formulário submetidos:', data)
    alert('Formulário enviado com sucesso! Verifique o console para os dados.')
    // Aqui você enviaria os dados para um backend, um serviço de e-mail, etc.
    console.log(`Nome: ${data.name}`)
    console.log(`Email: ${data.email}`)
    console.log(`WhatsApp: ${data.whatsapp}`)
    console.log(`Instagram: ${data.instagram}`)
    console.log(`Desafio: ${data.challengeDescription}`)
  }

  return (
    // Certifique-se de envolver o FormSection em um contêiner, se necessário
    <div className="min-h-screen">
      <FormSection
        sectionTitle="Fale Conosco"
        descriptionText="Preencha o formulário abaixo para iniciarmos uma conversa estratégica sobre a sua marca."
        fields={myFormFields} // Passando os campos definidos
        submitButtonText="Quero Aumentar Meu Valor!"
        onSubmit={handleMyFormSubmit} // Passando a função de submissão
        buttonProps={{
          bgColor: '#D9FF85', // Cor do botão do seu Button.tsx
          textColor: '#000000',
          expanded: true, // Faz o botão ocupar toda a largura disponível
          icon: <Icon type="ai" /> // Ícone de avião de papel
        }}
      />
    </div>
  )
}
