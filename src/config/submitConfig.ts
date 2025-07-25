import { WhatsAppSubmitConfig } from '@types'

// Configuração para WhatsApp
export const submitConfig: WhatsAppSubmitConfig = {
  type: 'whatsapp',
  phoneNumber: 'seunumeroaqui',
  messageTemplate:
    'Olá! Meu nome é {name}, meu email é {email} e meu @ eh {instagram} e gostaria de falar sobre: {message}'
}

// Configuração alternativa para email (se precisar)
export const emailSubmitConfig = {
  type: 'email',
  formSubmitUrl: 'https://formspree.io/f/your-form-id',
  redirectUrl: 'https://seusite.com/obrigado',
  subject: 'Novo contato do site'
}

// Função para validar a configuração
export const validateSubmitConfig = (config: any): boolean => {
  console.log('Validando configuração:', config)

  if (!config) {
    console.error('Configuração não encontrada')
    return false
  }

  if (!config.type) {
    console.error('Tipo da configuração não definido')
    return false
  }

  if (config.type === 'whatsapp') {
    if (!config.phoneNumber) {
      console.error('Número do WhatsApp não definido')
      return false
    }

    // Verifica se o número está no formato correto (só números)
    if (!/^\d+$/.test(config.phoneNumber)) {
      console.error('Número do WhatsApp deve conter apenas números')
      return false
    }
  }

  if (config.type === 'email') {
    if (!config.formSubmitUrl) {
      console.error('URL do formulário não definida')
      return false
    }
  }

  return true
}

// Export default também para compatibilidade
export default submitConfig
