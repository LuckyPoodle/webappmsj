import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AuthProvider } from '../context/useAuth'

import { Provider } from '../context'
import toast, { Toaster } from 'react-hot-toast'
function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <AuthProvider>
        <Head>
          <link
            href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css'
            rel='stylesheet'
          />
        </Head>

        <Component {...pageProps} />

        <Toaster />
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
