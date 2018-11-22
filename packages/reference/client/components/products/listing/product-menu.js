import { connectStateResults } from 'react-instantsearch-dom'

export const ProductMenu = (props) => {
  const searchQuery = props.searchState.query
  let searchTitle = 'Showing all products'

  if (searchQuery) {
    searchTitle = `Search "${searchQuery}"`
  }

  return (
    <div className='c-product-listing__menu-description'>
      <h1 className='c-product-listing__menu-description-title'>
        { props.title || searchTitle }
      </h1>
    </div>
  )
}

export default connectStateResults(ProductMenu)
