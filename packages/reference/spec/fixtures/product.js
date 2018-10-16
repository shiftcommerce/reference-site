import { fixedPrice } from '../../client/lib/fixed-price'

const Product = {
  id: 1,
  canonical_path: '1',
  title: 'Textured Long T-Shirt',
  description: 'Part of our Made in Britain collection, the limited edition Thruxton jacket by Morley offers great style and practicality for everyday wear.',
  price: fixedPrice(10),
  min_current_price: fixedPrice(10),
  max_current_price: fixedPrice(10),
  meta_attributes: {
    master_colour: {
      value: 'Stone'
    },
    silhouette: {
      value: 'Flexible Waist'
    },
    product_feature: {
      value: 'Stretch Fit'
    },
    care_instructions: {
      value: 'Machine Washable'
    },
    fabric: {
      value: '100% cotton'
    }
  },
  variants: [
    {
      sku: 1,
      title: 'Small',
      price: fixedPrice(10.0),
      stock_available_level: '1000',
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
      stock_available_level: '1000',
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
      stock_available_level: '1000',
      meta_attributes: {
        size: {
          value: 'Size 12'
        }
      }
    }
  ],
  bundles: [
    {
      asset_files: [
        {
          asset_file: '1513767197.7652595-1847 -_Anna_Outfit_1-3_099.jpg',
          canonical_path: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/157928/1513767197.7652595-1847-_Anna_Outfit_1-3_099.jpg',
          created_at: '2017-12-20T10:53:17Z',
          file_content_content_type: 'image/jpeg',
          s3_url: 'https://shift-platform-dev-assets.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/157928/1513767197.7652595-1847-_Anna_Outfit_1-3_099.jpg'
        }
      ],
      canonical_path: '/bundles/anna-outfit-1',
      id: '261',
      name: 'Anna Outfit 1',
      slug: 'anna-outfit-1'
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
