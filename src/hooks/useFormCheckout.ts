import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Store } from 'react-notifications-component'
import { schema } from '../Components/FormCheckout/schema'
import { FormProps } from '../Components/FormCheckout/types'

export const useFormCheckout = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  const handleForm = (data: FormProps) => {
    Store.addNotification({
      title: 'Sucesso!',
      message: 'Seu checking foi realizado com sucesso',
      type: 'success',
      insert: 'top',
      container: 'top-center',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    })
    console.log({ data })
    reset()
  }

  return {
    errors,
    register,
    handleSubmit,
    handleForm,
  }
}
