// Libraries
import { Component } from 'react'

// Components
import Layout from '../../components/Layout'
import ProductDisplay from '../../components/products/ProductDisplay'

// Objects
import Breadcrumb from '../../objects/Breadcrumb'

class Product extends Component {
  render () {
    const product = {
      id: 1,
      title: 'Textured Long T-Shirt',
      description: 'Combining comfort and practicality, this grey marl textured t-shirt is a go-to everyday essential. Featuring a v-neck and front pocket, this staple piece can be layered to create a range different looks.',
      sku: 'SKU2659078',
      price: '£99',
      meta: {
        colour: 'Blue'
      },
      variants: [
                        { id: 1, title: 'Small', size: 'Size 8' },
                        { id: 2, title: 'Medium', size: 'Size 10' },
                        { id: 3, title: 'Large', size: 'Size 12' }
      ],
      bundles: [
        {
          id: 1,
          title: 'Mingo',
          products: [
            {
              id: 1,
              title: 'Stripe Shirt',
              canonical_path: '/products/stripe-shirt',
              asset_files: [
                                { id: 2, url: 'https://staging-matalanintegration-1452506760.s3.amazonaws.com/uploads/asset_file/asset_file/12917/S2623404_C146_Main.jpg' }
              ]
            },
            {
              id: 2,
              title: 'Slip on Pump (no asset files example)',
              canonical_path: '/products/slip-on-pump',
              asset_files: []
            }
          ]
        }
      ],
      asset_files: [
        {
          id: 1,
          url: 'https://staging-matalanintegration-1452506760.s3.amazonaws.com/uploads/asset_file/asset_file/12671/S2623408_C29P_Alt2.jpg'
        }
      ]
    }

    const breadcrumbMenuTrail = [
                                  { id: 1, title: 'Womens', canonical_path: '/womens' },
                                  { id: 2, title: 'Textured Long T-Shirt', canonical_path: '/products/textured-long-t-shirt' }
    ]

    return (
      <Layout>
        <div>
          <Breadcrumb trail={breadcrumbMenuTrail} />
        </div>

        <ProductDisplay product={product} />
      </Layout>
    )
  }
}

export default Product
