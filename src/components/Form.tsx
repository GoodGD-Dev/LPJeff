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
  className = ''
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {}
    fields.forEach((field) => {
      initialData[field.name] = field.initialValue || ''
    })
    return initialData
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

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
      } else if (submitConfig.type === 'whatsapp') {
        const whatsappConfig = submitConfig as WhatsAppSubmitConfig
        const message = formatWhatsAppMessage(formData)
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`

        window.open(whatsappUrl, '_blank')
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    } finally {
      setIsSubmitting(false)
    }
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
              className={field.className}
              {...(field.inputProps || {})} // Spread das props extras, incluindo variant
            />
          )}
        </div>
      ))}
      <Button
        {...buttonProps}
        className={`${buttonProps?.className || ''} mx-auto`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : submitButtonText}
      </Button>
    </form>
  )
}

export default Form

// Exemplo de uso com variant:
/*
const fieldsWithVariant = [
  {
    name: 'name',
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    inputProps: {
      variant: 'outlined' // ou qualquer variant válido do seu Input
    }
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Digite seu email'
    // sem inputProps = sem variant
  }
]
*/
