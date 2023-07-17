import ImgCapadocia from './assets/passeios-de-balao-capadocia.jpg'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'react-notifications-component/dist/theme.css'
import { FormCheckout } from './Components/FormCheckout/FormChekout'
import { ReactNotifications } from 'react-notifications-component'

function App() {
  return (
    <main className="grid grid-nogutter surface-0 text-800 max-w-full max-h-full">
      <ReactNotifications />
      <div className="col-12 lg:col-6 p-6 text-center lg:text-left flex align-items-center xl:justify-content-center">
        <section>
          <h1 className="text-6xl text-indigo-500 font-bold mb-6">
            Faça seu Checkout.
          </h1>
          <FormCheckout />
        </section>
      </div>
      <section className="col-12 md:col-6 overflow-hidden hidden lg:block">
        <img
          className="md:ml-auto block md:h-full "
          style={{
            clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)',
            width: '1700px',
          }}
          src={ImgCapadocia}
          alt="imagem de balões voando sobre a capadocia"
        />
      </section>
    </main>
  )
}

export default App
