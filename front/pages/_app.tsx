import type { AppProps } from 'next/app'

import "../app/globals.css"
import Header from './components/Header'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <> <Header/> <Component {...pageProps} /> </>
}