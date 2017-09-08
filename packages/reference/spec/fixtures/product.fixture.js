const Product = {
  id: 1,
  title: 'Textured Long T-Shirt',
  price: '£99',
  meta_data: {
    eu: {
      colour: 'Blue',
      sku: 'SKU2659078',
      description: 'Combining comfort and practicality, this grey marl textured t-shirt is a go-to everyday essential. Featuring a v-neck and front pocket, this staple piece can be layered to create a range different looks.'
    }
  },
  variants: [
    {
      sku: 1,
      title: 'Small',
      meta_data: {
        eu: {
          size: 'Size 8',
          price: 10.00
        }
      }
    },
    {
      sku: 2,
      title: 'Medium',
      meta_data: {
        eu: {
          size: 'Size 10',
          price: 11.00
        }
      }
    },
    {
      sku: 3,
      title: 'Large',
      meta_data: {
        eu: {
          size: 'Size 12',
          price: 12.00
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
      id: 1,
      url: 'https://staging-matalanintegration-1452506760.s3.amazonaws.com/uploads/asset_file/asset_file/12671/S2623408_C29P_Alt2.jpg'
    }
  ]
}

export default Product
