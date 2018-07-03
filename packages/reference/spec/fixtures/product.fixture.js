import { fixedPrice } from '../../lib/fixedPrice'

const Product = {
  id: 1,
  canonical_path: '1',
  title: 'Textured Long T-Shirt',
  description: 'Part of our Made in Britain collection, the limited edition Thruxton jacket by Morley offers great style and practicality for everyday wear.',
  price: fixedPrice(99.0),
  meta_attributes: {
    master_colour: {
      value: 'Stone'
    }
  },
  variants: [
    {
      sku: 1,
      title: 'Small',
      price: fixedPrice(10.0),
      meta_attributes: {
        size: {
          value: 'Size 8'
        }
      }
    },
    {
      sku: 2,
      title: 'Medium',
      price: fixedPrice(11.0),
      meta_attributes: {
        size: {
          value: 'Size 10'
        }
      }
    },
    {
      sku: 3,
      title: 'Large',
      price: fixedPrice(12.0),
      meta_attributes: {
        size: {
          value: 'Size 12'
        }
      }
    }
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
      asset_file: 'S2623408_C29P_Alt2.jpg',
      alt_text: 'Textured Long T-Shirt',
      s3_url: 'https://staging-matalanintegration-1452506760.s3.amazonaws.com/uploads/asset_file/asset_file/12671/S2623408_C29P_Alt2.jpg'
    }
  ]
}

export default Product
