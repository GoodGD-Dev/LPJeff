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
  label: string
  type: FormFieldType
  placeholder?: string
  variant?: InputVariant
  initialValue?: string
  options?: SelectOption[]
  className?: string
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
