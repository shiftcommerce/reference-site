import Config from './config'

/**
 * Lib
 */
import FormErrors from './form-errors'

/**
 * Objects
 */
import Breadcrumb from '../objects/breadcrumb'
import Button from '../objects/button'
import Checkbox from '../objects/checkbox'
import ConditionalLink from '../objects/conditional-link'
import DropdownSelect from '../objects/dropdown-select'
import Image from '../objects/image'
import Input from '../objects/input'
import LazyLoad from '../objects/lazy-load'
import Link from '../objects/link'
import Loading from '../objects/loading'
import Logo from '../objects/logo'
import Rating from '../objects/rating'
import VariantSelector from '../objects/variant-selector'

/**
 * PDP Components
 */
import ProductCarousel from '../components/products/display/product-carousel'
import ProductEwisForm from '../components/products/display/product-ewis-form'
import ProductPrice from '../components/products/display/product-price'

/**
 * PLP Components
 */
import ProductMenu from '../components/products/listing/product-menu'
import ProductMenuOptions from '../components/products/listing/product-menu-options'

/**
 * Order Components
 */
import OrderLineItems from '../components/orders/order-line-items'
import OrderList from '../components/orders/order-list'
import ShippingAddresses from '../components/orders/shipping-addresses'

/**
 * Search Components
 */
import SearchFilters from '../components/search/search-filters'
import SearchHits from '../components/search/search-hits'
import SearchRatingFilter from '../components/search/search-rating-filter'
import SearchRefinements from '../components/search/search-refinements'
import SearchSlider from '../components/search/search-slider'

/**
 * Static Page
 */
import StaticPageError from '../components/static-page/error'
import StaticPageErrorBody from '../components/static-page/error-body'
import StaticPageErrorDetails from '../components/static-page/error-details'

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
  Logo,
  OrderLineItems,
  OrderList,
  ProductCarousel,
  ProductEwisForm,
  ProductMenu,
  ProductMenuOptions,
  ProductPrice,
  Rating,
  SearchFilters,
  SearchHits,
  SearchRatingFilter,
  SearchRefinements,
  SearchSlider,
  ShippingAddresses,
  StaticPageError,
  StaticPageErrorBody,
  StaticPageErrorDetails,
  VariantSelector
}

export default function (module) {
  return Config.get()[module] || mapping[module]
}
