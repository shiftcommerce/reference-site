import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'

// utils
import configureStore from '../utils/configureStore'

// Components
import Layout from '../components/Layout'

// Objects
import Button from '../objects/Button'
import Image from '../objects/Image'

class Womens extends Component {
  render () {
    let url = 'https://staging-matalanintegration-1452506760.s3.amazonaws.com/uploads/asset_file/asset_file/12671/S2623408_C29P_Alt2.jpg'
    return (
      <Layout>
        <h1>Womens</h1>
        <div>
          <Link href='categories/womens' >
            <a>
              <Button label='New In' status='positive' />
            </a>
          </Link>
        </div>
        <div>
          <div>
            <Image src={url} alt='textured-long-t-shirt' height='350' width='250' aria-label='textured-long-t-shirt' />
          </div>
          <Link href='/products/708a0142-e60f-4332-9a8b-1359c5af9ec4' >
            <a>
              <Button label='Textured Long T Shirt' status='info' />
            </a>
          </Link>
        </div>
      </Layout>
    )
  }
}

export default withRedux(configureStore)(Womens)
