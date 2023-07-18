import { createUtcDateForIso } from '../../utils/createDateIso'
import { useFormCheckout } from '../../hooks/useFormCheckout'

export const FormCheckout = () => {
  const { errors, register, handleForm, handleSubmit } = useFormCheckout()

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
            className={` border-round p-3 border-1 ${
              !errors.initialDate ? 'border-400' : 'border-red-600'
            }`}
          />
          {errors.initialDate?.message && (
            <small className="text-red-600">{errors.initialDate.message}</small>
          )}
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
            className={` border-round p-3 border-1 ${
              !errors.finalDate ? 'border-400' : 'border-red-600'
            }`}
          />
          {errors.finalDate?.message && (
            <small className="text-red-600">{errors.finalDate.message}</small>
          )}
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
              className={` border-round p-3 border-1 ${
                !errors.adultPassengers ? 'border-400' : 'border-red-600'
              }`}
            />
            {errors.adultPassengers?.message && (
              <small className="text-red-600">
                {errors.adultPassengers.message}
              </small>
            )}
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
              className={` border-round p-3 border-1 ${
                !errors.kidsPassengers ? 'border-400' : 'border-red-600'
              }`}
            />
            {errors.kidsPassengers?.message && (
              <small className="text-red-600">
                {errors.kidsPassengers.message}
              </small>
            )}
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
          className={` border-round p-3 border-1 ${
            !errors.username ? 'border-400' : 'border-red-600'
          }`}
        />
        <small id="username-help" className="text-left">
          Nome do passageiro principal
        </small>
        {errors.username?.message && (
          <small className="text-red-600">{errors.username.message}</small>
        )}
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
          className={` border-round p-3 border-1 ${
            !errors.userEmail ? 'border-400' : 'border-red-600'
          }`}
        />
        <small id="userEmail-help" className="text-left">
          E-mail do passageiro principal
        </small>
        {errors.userEmail?.message && (
          <small className="text-red-600">{errors.userEmail.message}</small>
        )}
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
            className={` border-round p-3 border-1 ${
              !errors.origin ? 'border-400' : 'border-red-600'
            }`}
          />
          {errors.origin?.message && (
            <small className="text-red-600">{errors.origin.message}</small>
          )}
        </div>

        <div className="flex flex-column gap-2  justify-content-center sm:justify-content-end">
          <label htmlFor="destiny" className="font-semibold text-left">
            Destino
          </label>
          <input
            {...register('destiny')}
            type="text"
            id="destiny"
            className={` border-round p-3 border-1 ${
              !errors.destiny ? 'border-400' : 'border-red-600'
            }`}
          />
          {errors.destiny?.message && (
            <small className="text-red-600">{errors.destiny.message}</small>
          )}
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
