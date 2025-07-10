import { ReactNode, InputHTMLAttributes } from 'react'
import { ButtonProps } from './ui'

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
  placeholder?: string
  variant?: 'default' | 'larger'
  initialValue?: string
  options?: { value: string; label: string }[]
  className?: string
}

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
  variant?: 'default' | 'larger'
  label?: string
  errorMessage?: string
}
