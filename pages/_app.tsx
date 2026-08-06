import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])


  return (
    <Component {...pageProps} />
  )
}

export default MyApp
