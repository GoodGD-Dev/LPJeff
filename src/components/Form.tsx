import React, { useState, FormEvent } from 'react'
import { Button, Input } from '@ui'
import {
  EmailSubmitConfig,
  EnhancedFormProps,
  FormProps,
  WhatsAppSubmitConfig
} from '@types'

const Form: React.FC<EnhancedFormProps> = ({
  fields,
  submitButtonText,
  submitConfig,
  onSubmit,
  title,
  buttonProps,
  children,
  className = '',
  successMessage = 'Formulário enviado com sucesso!',
  successTitle = 'Obrigado!'
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {}
    fields.forEach((field) => {
      initialData[field.name] = field.initialValue || ''
    })
    return initialData
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const formatWhatsAppMessage = (data: Record<string, string>) => {
    const config = submitConfig as WhatsAppSubmitConfig

    if (config.messageTemplate) {
      let message = config.messageTemplate
      Object.entries(data).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, value)
      })
      return message
    }

    let message = 'Olá! Segue as informações do formulário:\n\n'
    Object.entries(data).forEach(([key, value]) => {
      if (value.trim()) {
        const fieldLabel = fields.find((f) => f.name === key)?.label || key
        message += `*${fieldLabel}:* ${value}\n`
      }
    })
    return message
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (onSubmit) {
        onSubmit(formData)
      }

      if (submitConfig.type === 'email') {
        const emailConfig = submitConfig as EmailSubmitConfig

        const form = document.createElement('form')
        form.method = 'POST'
        form.action = emailConfig.formSubmitUrl
        form.style.display = 'none'

        Object.entries(formData).forEach(([key, value]) => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = value
          form.appendChild(input)
        })

        if (emailConfig.redirectUrl) {
          const redirectInput = document.createElement('input')
          redirectInput.type = 'hidden'
          redirectInput.name = '_next'
          redirectInput.value = emailConfig.redirectUrl
          form.appendChild(redirectInput)
        }

        if (emailConfig.subject) {
          const subjectInput = document.createElement('input')
          subjectInput.type = 'hidden'
          subjectInput.name = '_subject'
          subjectInput.value = emailConfig.subject
          form.appendChild(subjectInput)
        }

        const captchaInput = document.createElement('input')
        captchaInput.type = 'hidden'
        captchaInput.name = '_captcha'
        captchaInput.value = 'false'
        form.appendChild(captchaInput)

        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)

        // Para email, aguarda um pouco antes de mostrar sucesso
        setTimeout(() => {
          setIsSuccess(true)
          setIsSubmitting(false)
        }, 1000)
      } else if (submitConfig.type === 'whatsapp') {
        const whatsappConfig = submitConfig as WhatsAppSubmitConfig
        const message = formatWhatsAppMessage(formData)
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`

        window.open(whatsappUrl, '_blank')

        // Para WhatsApp, mostra sucesso imediatamente após abrir
        setTimeout(() => {
          setIsSuccess(true)
          setIsSubmitting(false)
        }, 500)
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setIsSubmitting(false)
    }
  }

  const handleNewSubmission = () => {
    setIsSuccess(false)
    setFormData(() => {
      const initialData: Record<string, string> = {}
      fields.forEach((field) => {
        initialData[field.name] = field.initialValue || ''
      })
      return initialData
    })
  }

  // Tela de sucesso
  if (isSuccess) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-6 text-center ${className}`}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Ícone de sucesso */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Título de sucesso */}
          <h2 className="text-3xl font-bold text-text">{successTitle}</h2>

          {/* Mensagem de sucesso */}
          <p className="text-text-muted text-lg max-w-md">{successMessage}</p>

          {/* Botão para enviar novamente (opcional) */}
          <Button
            onClick={handleNewSubmission}
            className="mt-4 border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
          >
            Enviar outro formulário
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-6 ${className}`}
    >
      {title && <h2 className="text-3xl font-bold text-text mb-4">{title}</h2>}
      {children}
      {fields.map((field) => (
        <div key={field.name} className="w-full">
          {field.type === 'textarea' ? (
            <>
              {field.label && (
                <label
                  htmlFor={field.name}
                  className="mb-1 text-text text-sm font-medium"
                >
                  {field.label}
                </label>
              )}
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`
                  flex
                  gap-6
                  rounded-2xl
                  border
                  border-border
                  bg-secondary-light
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                  focus:border-transparent
                  w-full
                  min-h-[100px]
                  text-text-muted
                  resize-none
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  ${field.className || ''}
                `}
                rows={4}
              />
            </>
          ) : field.type === 'select' ? (
            <>
              {field.label && (
                <label
                  htmlFor={field.name}
                  className="mb-1 text-text-muted text-sm font-medium"
                >
                  {field.label}
                </label>
              )}
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`
                  flex
                  gap-6
                  rounded-2xl
                  border
                  border-border
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                  focus:border-transparent
                  w-full
                  appearance-none
                  pr-8
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  ${field.className || ''}
                `}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} ${field.className || ''}`}
              {...(field.inputProps || {})}
            />
          )}
        </div>
      ))}
      <Button
        {...buttonProps}
        className={`${buttonProps?.className || ''} mx-auto`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Enviando...
          </div>
        ) : (
          submitButtonText
        )}
      </Button>
    </form>
  )
}

export default Form
