import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/static/images/logo/favicon.png" type="image/png" sizes="16x16" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
