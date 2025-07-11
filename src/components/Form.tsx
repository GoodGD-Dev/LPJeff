import React, { useState, FormEvent } from 'react'
import { Button, Input } from '@ui'
import { FormProps } from '@types'

const Form: React.FC<FormProps> = ({
  fields,
  submitButtonText,
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
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
                  rounded-2x1
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
              variant={field.variant}
              value={formData[field.name]}
              onChange={handleChange}
              className={field.className}
            />
          )}
        </div>
      ))}
      <Button
        {...buttonProps}
        className={`${buttonProps?.className || ''} mx-auto`}
      >
        {submitButtonText}
      </Button>
    </form>
  )
}

export default Form
