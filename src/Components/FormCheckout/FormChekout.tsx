import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// const VALUES = [
//   'Nova Iorque',
//   'Roma',
//   'Londres',
//   'Istambul',
//   'Paris',
//   'Rio de Janeiro',
// ] as const

const schema = z.object({
  initialDate: z.date(),
  finalDate: z.date(),
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
  origin: z.string().min(1, 'Esta campo é obrigatório'),
  destiny: z.string().min(1, 'Esta campo é obrigatório'),
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
  const handleForm = (data: FormProps) => console.log({ data })

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
            {...register('initialDate')}
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
            {...register('finalDate')}
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