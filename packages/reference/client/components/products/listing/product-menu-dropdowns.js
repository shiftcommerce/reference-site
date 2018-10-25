const ProductMenuDropdowns = () => (
  <div className='c-product-listing__menu-dropdowns'>
    <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--category'>
      <select className='c-product-listing__menu-dropdown-select'><option>category</option></select>
    </div>
    <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--colour'>
      <select className='c-product-listing__menu-dropdown-select'><option>colour</option></select>
    </div>
    <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--size'>
      <select className='c-product-listing__menu-dropdown-select'><option>size</option></select>
    </div>
    <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--price'>
      <select className='c-product-listing__menu-dropdown-select'><option>price</option></select>
    </div>
    <div className='c-product-listing__menu-dropdown c-product-listing__menu-dropdown--sortby'>
      <select className='c-product-listing__menu-dropdown-select'><option>sort by</option></select>
    </div>
  </div>
)

export default ProductMenuDropdowns
