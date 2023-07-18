import { z } from 'zod'
import { schema } from './schema'
import { InputHTMLAttributes } from 'react'

// Arquivo para exportação de tipagens
export type FormProps = z.infer<typeof schema>

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
  id: string
  describedby?: string
}
