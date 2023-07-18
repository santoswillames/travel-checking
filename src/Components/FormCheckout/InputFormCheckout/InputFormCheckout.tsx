import { forwardRef } from 'react'
import { InputProps } from '../types'

// Componente de input

// eslint-disable-next-line react/display-name
export const InputFormCheckout = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, helperText = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-column gap-2">
        <label htmlFor={id} className="font-semibold text-left">
          {label}
        </label>
        <input type={type} {...props} ref={ref} id={id} />
        {helperText?.length > 0 && (
          <small className="text-red-600 text-left">{helperText}</small>
        )}
      </div>
    )
  },
)
