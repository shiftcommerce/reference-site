import BannerImage from './banner-image'
import EmailSignup from './email-signup'
import GenericGrid from './generic-grid'
import HeroFull from './hero-full'
import HorizontalDivider from './horizontal-divider'
import ProductGrid from './product-grid'

import shiftNextConfig from '@shiftcommerce/shift-next/src/lib/config'

const defaultTemplates = {
  banner_image: BannerImage,
  email_signup: EmailSignup,
  generic_grid: GenericGrid,
  hero_full: HeroFull,
  horizontal_divider: HorizontalDivider,
  product_grid: ProductGrid
}

export default () => Object.assign({}, defaultTemplates, shiftNextConfig.get().customTemplateComponents)
