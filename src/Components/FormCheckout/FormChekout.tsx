import { createUtcDateForIso } from '../../utils/createDateIso'
import { useFormCheckout } from '../../hooks/useFormCheckout'
import { InputFormCheckout } from './InputFormCheckout'

export const FormCheckout = () => {
  const { errors, register, handleForm, handleSubmit } = useFormCheckout()

  return (
    <form
      className="w-full gap-4 flex flex-column"
      onSubmit={handleSubmit(handleForm)}
    >
      <div className="flex  flex-column sm:flex-row gap-4 p-fluid justify-content-center sm:justify-content-between">
        <InputFormCheckout
          label="Data de ida"
          helperText={errors?.initialDate?.message}
          id="initialDate"
          type="date"
          {...register('initialDate', {
            setValueAs: (value: string) => {
              if (!value) return -1
              return createUtcDateForIso(value)
            },
          })}
          className={` border-round p-3 border-1 ${
            !errors.initialDate ? 'border-400' : 'border-red-600'
          }`}
        />
        <InputFormCheckout
          label="Data de volta"
          id="finalDate"
          type="date"
          {...register('finalDate', {
            setValueAs: (value: string) => {
              if (!value) return -1
              return createUtcDateForIso(value)
            },
          })}
          className={` border-round p-3 border-1 ${
            !errors.finalDate ? 'border-400' : 'border-red-600'
          }`}
          helperText={errors.finalDate?.message}
        />
      </div>

      <div className="flex flex-wrap p-fluid ">
        <p className="text-lg w-10 font-semibold text-center sm:text-left">
          Quantidade de Passageiros:
        </p>
        <div className="flex flex-column sm:flex-row gap-4 p-fluid justify-content-center sm:justify-content-between w-full">
          <InputFormCheckout
            label="Adultos"
            type="number"
            id="adultPassengers"
            helperText={errors?.adultPassengers?.message}
            className={` border-round p-3 border-1 ${
              !errors.adultPassengers ? 'border-400' : 'border-red-600'
            }`}
            {...register('adultPassengers', {
              setValueAs: (value: string) => parseInt(value, 10),
            })}
          />
          <InputFormCheckout
            label="Crianças"
            type="number"
            id="kidsPassengers"
            helperText={errors?.kidsPassengers?.message}
            className={` border-round p-3 border-1 ${
              !errors.kidsPassengers ? 'border-400' : 'border-red-600'
            }`}
            {...register('kidsPassengers', {
              setValueAs: (value: string) => {
                if (!value) return 0
                if (value < '0') return 0
                if (value) {
                  return parseInt(value, 10)
                }
              },
            })}
          />
        </div>
      </div>

      <InputFormCheckout
        label="Nome"
        type="text"
        id="username"
        placeholder="Nome do passageiro principal"
        aria-describedby="username-help"
        helperText={errors.username?.message}
        {...register('username')}
        className={` border-round p-3 border-1 ${
          !errors.username ? 'border-400' : 'border-red-600'
        }`}
      />
      <InputFormCheckout
        label="E-mail"
        id="userEmail"
        aria-describedby="userEmail-help"
        placeholder="email@exemplo.com"
        helperText={errors.userEmail?.message}
        {...register('userEmail')}
        className={` border-round p-3 border-1 ${
          !errors.userEmail ? 'border-400' : 'border-red-600'
        }`}
      />

      <div className="flex flex-column sm:flex-row gap-4 p-fluid justify-content-center sm:justify-content-between">
        <InputFormCheckout
          label="Origem"
          type="text"
          id="origin"
          helperText={errors.origin?.message}
          {...register('origin')}
          className={` border-round p-3 border-1 ${
            !errors.origin ? 'border-400' : 'border-red-600'
          }`}
        />
        <InputFormCheckout
          label="Destino"
          type="text"
          id="destiny"
          helperText={errors.destiny?.message}
          {...register('destiny')}
          className={` border-round p-3 border-1 ${
            !errors.destiny ? 'border-400' : 'border-red-600'
          }`}
        />
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
