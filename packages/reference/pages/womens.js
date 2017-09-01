import { Component } from 'react'

import Layout from '../components/Layout'
import Link from 'next/link'

import Button from '../objects/Button'
import ContentImage from '../objects/ContentImage'

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
            <ContentImage src={url} alt='textured-long-t-shirt' height='350' width='250' aria-label='textured-long-t-shirt' />
          </div>
          <Link href='/products/textured-long-t-shirt' >
            <a>
              <Button label='Textured Long T Shirt' status='info' />
            </a>
          </Link>
        </div>
      </Layout>
    )
  }
}

export default Womens
