import { z } from 'zod'
import { createUtcDateForIso } from '../../utils/createDateIso'

export const schema = z
  .object({
    initialDate: z
      .number()
      .positive('Escolha a data de ida.')
      .refine(
        (val) => {
          const today = new Date()
          const td = new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })
            .format(today)
            .split('/')
            .reverse()
            .join('-')
          return val >= createUtcDateForIso(td)
        },
        {
          message: 'A data de ida não pode ser anterior a data atual',
        },
      ),
    finalDate: z.number().positive('Escolha a data de retorno.'),
    adultPassengers: z
      .number({
        errorMap: () => {
          return { message: 'Informe um número de passageiro' }
        },
      })
      .positive('Informe pelo menos um passageiro adulto'),
    kidsPassengers: z
      .number()
      .nonnegative('O número de crianças não pode ser menor que 0'),
    username: z.string().min(1, 'É necessário enviar um nome'),
    userEmail: z.string().email('Insira um email válido'),
    origin: z.string().min(1, 'Este campo é obrigatório'),
    destiny: z.string().min(1, 'Este campo é obrigatório'),
  })
  .refine((data) => data.finalDate >= data.initialDate, {
    message: 'A data de volta não pode ser anterior a data de ida.',
    path: ['finalDate'],
  })
