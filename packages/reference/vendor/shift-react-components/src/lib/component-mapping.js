import Config from './config'

// Objects
import Breadcrumb from '../../src/objects/breadcrumb'
import Button from '../../src/objects/button'
import Checkbox from '../../src/objects/checkbox'
import DropdownSelect from '../../src/objects/dropdown-select'
import Image from '../../src/objects/image'
import Input from '../../src/objects/input'
import LazyLoad from '../../src/objects/lazy-load'
import Link from '../../src/objects/link'
import Rating from '../../src/objects/rating'
import VariantSelector from '../../src/objects/variant-selector'

const mapping = {
  Breadcrumb,
  Button,
  Checkbox,
  DropdownSelect,
  Image,
  Input,
  LazyLoad,
  Link,
  Rating,
  VariantSelector
}

export default function (module) {
  return Config.get()[module] || mapping[module]
}
