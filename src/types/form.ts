import { ReactNode, InputHTMLAttributes } from 'react'
import { FormFieldType, InputVariant } from './common'
import { ButtonProps } from './ui'

// Interfaces de dados de formulário
export interface SelectOption {
  value: string
  label: string
}

export interface FormField {
  name: string
  label?: string
  type: FormFieldType
  placeholder?: string
  variant?: InputVariant | string
  initialValue?: string
  options?: SelectOption[]
  className?: string
  required?: boolean
}

// Props para componentes de formulário
export interface FormProps {
  fields: FormField[]
  submitButtonText: string
  onSubmit: (formData: Record<string, string>) => void
  title?: string
  buttonProps?: Partial<ButtonProps>
  children?: ReactNode
  className?: string
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
  errorMessage?: string
}

export interface ContactProps {
  sectionTitle: string | ReactNode
  descriptionText: string
  fields: FormField[]
  submitButtonText: string
  onSubmit: (formData: Record<string, string>) => void
  formTitle?: string
  buttonProps?: any
  formChildren?: React.ReactNode
  security?: string
  className?: string
  formClassName?: string
  submitConfig: EmailSubmitConfig | WhatsAppSubmitConfig
  successMessage?: string
  successTitle?: string
}

// Tipos específicos para cada tipo de formulário
export interface EmailFormConfig {
  type: 'email'
  recipientEmail: string
  emailSubject?: string
}

export interface WhatsAppFormConfig {
  type: 'whatsapp'
  phoneNumber: string
  whatsappApiToken?: string
  useUrlScheme?: boolean
}

export type FormSubmissionConfig = EmailFormConfig | WhatsAppFormConfig

// Resposta da API
export interface ApiResponse {
  success: boolean
  message: string
  error?: string
  whatsappUrl?: string
  whatsappId?: string
}

// Tipos para os diferentes métodos de envio
export interface EmailSubmitConfig {
  type: 'email'
  formSubmitUrl: string
  redirectUrl?: string
  subject?: string
}

export interface WhatsAppSubmitConfig {
  type: 'whatsapp'
  phoneNumber: string
  messageTemplate?: string
}

// Interface para campos com variant seguro
export interface EnhancedFormField {
  name: string
  type: string
  label?: string
  placeholder?: string
  initialValue?: string
  className?: string
  options?: Array<{ value: string; label: string }>
  inputProps?: Record<string, any>
}

export interface EnhancedFormProps
  extends Omit<FormProps, 'onSubmit' | 'fields'> {
  fields: EnhancedFormField[]
  submitConfig: EmailSubmitConfig | WhatsAppSubmitConfig
  onSubmit?: (formData: Record<string, string>) => void
  successMessage?: string
  successTitle?: string
}
