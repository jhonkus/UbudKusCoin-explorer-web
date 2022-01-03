import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { Provider } from 'react-redux';
import store from '../app/store';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])


  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>)
}

export default MyApp
