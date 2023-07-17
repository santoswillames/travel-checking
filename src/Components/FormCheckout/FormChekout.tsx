import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Store } from 'react-notifications-component'
import { z } from 'zod'

function createUtcDateForIso(dateString: string): number {
  const offset = new Date().getTimezoneOffset()
  const myDate = Date.parse(dateString) - offset * 60 * 1000
  return myDate
}

const schema = z
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

type FormProps = z.infer<typeof schema>

export const FormCheckout = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  })
  console.log(errors)

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
  }

  return (
    <form
      className="w-full gap-4 flex flex-column"
      onSubmit={handleSubmit(handleForm)}
    >
      <div className="flex  flex-column sm:flex-row gap-4 p-fluid justify-content-center sm:justify-content-between">
        <div className="flex flex-column gap-2">
          <label htmlFor="initialDate" className="font-semibold text-left">
            Data de ida
          </label>
          <input
            {...register('initialDate', {
              setValueAs: (value: string) => {
                if (!value) return -1
                return createUtcDateForIso(value)
              },
            })}
            id="initialDate"
            type="date"
            className=" border-round p-3 border-1 border-400"
          />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="finalDate" className="font-semibold text-left">
            Data de volta
          </label>
          <input
            {...register('finalDate', {
              setValueAs: (value: string) => {
                if (!value) return -1
                return createUtcDateForIso(value)
              },
            })}
            id="finalDate"
            type="date"
            className=" border-round p-3 border-1 border-400"
          />
        </div>
      </div>

      <div className="flex flex-wrap p-fluid ">
        <p className="text-lg w-10 font-semibold text-center sm:text-left">
          Quantidade de Passageiros:
        </p>
        <div className="flex flex-column sm:flex-row gap-4 p-fluid justify-content-center sm:justify-content-between w-full">
          <div className="flex flex-column gap-2">
            <label
              htmlFor="adultPassengers"
              className="font-semibold text-left"
            >
              Adultos
            </label>
            <input
              {...register('adultPassengers', {
                setValueAs: (value: string) => parseInt(value, 10),
              })}
              type="number"
              id="adultPassengers"
              className=" border-round p-3 border-1 border-400"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label htmlFor="kidsPassengers" className="font-semibold text-left">
              Crianças
            </label>
            <input
              {...register('kidsPassengers', {
                setValueAs: (value: string) => {
                  if (!value) return 0
                  if (value < '0') return 0
                  if (value) {
                    return parseInt(value, 10)
                  }
                },
              })}
              type="number"
              id="kidsPassengers"
              className=" border-round p-3 border-1 border-400"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-column gap-2 ">
        <label htmlFor="username" className="font-semibold text-left">
          Nome
        </label>
        <input
          {...register('username')}
          type="text"
          id="username"
          aria-describedby="username-help"
          className=" border-round p-3 border-1 border-400"
        />
        <small id="username-help" className="text-left">
          Nome do passageiro principal
        </small>
      </div>

      <div className="flex flex-column gap-2 ">
        <label htmlFor="userEmail" className="font-semibold text-left">
          E-mail
        </label>
        <input
          {...register('userEmail')}
          id="userEmail"
          aria-describedby="userEmail-help"
          placeholder="email@exemplo.com"
          className=" border-round p-3 border-1 border-400"
        />
        <small id="userEmail-help" className="text-left">
          E-mail do passageiro principal
        </small>
      </div>

      <div className="flex flex-column sm:flex-row gap-4 p-fluid justify-content-center sm:justify-content-between">
        <div className="flex flex-column gap-2 ">
          <label htmlFor="origin" className="font-semibold text-left">
            Origem
          </label>
          <input
            {...register('origin')}
            type="text"
            id="origin"
            className=" border-round p-3 border-1 border-400"
          />
        </div>

        <div className="flex flex-column gap-2  justify-content-center sm:justify-content-end">
          <label htmlFor="destiny" className="font-semibold text-left">
            Destino
          </label>
          <input
            {...register('destiny')}
            type="text"
            id="destiny"
            className=" border-round p-3 border-1 border-400"
          />
        </div>
      </div>
      <div className="card flex justify-content-center sm:justify-content-end">
        <button className="flex text-base text-0 justify-content-center gap-2 p-3 w-full sm:w-auto bg-indigo-500 font-bold border-none border-round">
          <i className="pi pi-check"></i>
          Confirmar
        </button>
      </div>
    </form>
  )
}
