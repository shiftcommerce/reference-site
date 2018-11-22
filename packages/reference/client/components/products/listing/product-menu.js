import { connectStateResults } from 'react-instantsearch-dom'

export const ProductMenu = (props) => {
  return (
    <div className='c-product-listing__menu-description'>
      <h1 className='c-product-listing__menu-description-title'>
        { props.title || `Search "${props.searchState.query}"` }
      </h1>
      <div className='c-product-listing__menu-description-content'>
        <p>{ props.body || '' }</p>
      </div>
    </div>
  )
}

export default connectStateResults(ProductMenu)
