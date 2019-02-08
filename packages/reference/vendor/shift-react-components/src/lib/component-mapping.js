import Config from './config'

// Objects
import Breadcrumb from '../../src/objects/breadcrumb'
import Button from '../../src/objects/button'
import Checkbox from '../../src/objects/checkbox'
import ConditionalLink from '../../src/objects/conditional-link'
import DropdownSelect from '../../src/objects/dropdown-select'
import Image from '../../src/objects/image'
import Input from '../../src/objects/input'
import LazyLoad from '../../src/objects/lazy-load'
import Link from '../../src/objects/link'
import Loading from '../../src/objects/loading'
import Rating from '../../src/objects/rating'
import VariantSelector from '../../src/objects/variant-selector'

// Lib
import FormErrors from './form-errors'

// PDP Components
import ProductCarousel from '../../src/components/products/display/product-carousel'
import ProductEwisForm from '../../src/components/products/display/product-ewis-form'
import ProductPrice from '../../src/components/products/display/product-price'

// Orders
import OrderLineItems from '../components/orders/order-line-items'
import OrderList from '../components/orders/order-list'
import ShippingAddresses from '../../src/components/orders/shipping-addresses'

const mapping = {
  Breadcrumb,
  Button,
  Checkbox,
  ConditionalLink,
  DropdownSelect,
  FormErrors,
  Image,
  Input,
  LazyLoad,
  Link,
  Loading,
  OrderLineItems,
  OrderList,
  ProductCarousel,
  ProductEwisForm,
  ProductPrice,
  Rating,
  ShippingAddresses,
  VariantSelector
}

export default function (module) {
  return Config.get()[module] || mapping[module]
}
