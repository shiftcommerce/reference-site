import Head from 'next/head'

export default (props) => {
  const { children } = props

  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0' />
      <link rel='icon' type='image/png' sizes='32x32' href='../../static/favicon.png' key='favicon' />
      { children }
    </Head>
  )
}
