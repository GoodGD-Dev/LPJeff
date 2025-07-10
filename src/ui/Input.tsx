import { InputProps } from '@/types'
import React, { InputHTMLAttributes } from 'react'

const Input: React.FC<InputProps> = ({
  variant = 'default',
  label,
  errorMessage,
  className,
  placeholder,
  ...rest
}) => {
  const baseClasses = `
    flex
    items-center
    gap-6
    rounded-2xl
    border
    border-border
    bg-secondary-light
    text-white/60
    placeholder-text-muted
    focus:outline-none
    focus:ring-2
    focus:ring-primary
    focus:border-transparent
    w-full
  `

  const variantClasses = {
    default: 'py-3 px-4',
    larger: 'py-4 px-5'
  }

  return (
    <div className="flex flex-col w-full">
      <input
        className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
        placeholder={label || placeholder}
        {...rest}
      />
      {errorMessage && (
        <p className="mt-1 text-primary text-sm">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input
