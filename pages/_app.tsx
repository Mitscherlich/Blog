import ProgressBar from '@badrap/bar-of-progress'
import { AppProps } from 'next/app'
import Router from 'next/router'

import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

import '../styles.css'

const progress = new ProgressBar({
  size: 2,
  color: '#95979b',
  className: 'bar-of-progress',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
