// Libraries
import { Component } from 'react'
import { Configure, ClearAll, HierarchicalMenu, Hits, Pagination, RefinementList, SortBy, Stats } from 'react-instantsearch/dom'
import { createInstantSearch } from 'react-instantsearch/server'

// Components
import Product from './Product'

// Constants
import searchConfig from '../../../constants/searchConfig'
const { InstantSearch, findResultsState } = createInstantSearch()

class ProductListing extends Component {
  renderSearchStatistics (searchState) {
    return (
      <div role='Search Statistics' className='c-product_list__listing--stats'>
        { searchState.query !== undefined ? <Stats /> : null }
      </div>
    )
  }

  renderFacets (categoryID) {
    return (
      <div className='c-product_list__sidebar--filter'>
        <ClearAll clearsQuery />

        <HierarchicalMenu attributes={['category_ids']}
          selector='>'
          defaultRefinement={categoryID}
          rootPath={categoryID}
          limitMin={0}
          showParentLevel={false}
        />

        <p className='c-product_list__sidebar--filter-title'>Colour</p>
        <RefinementList attributeName='product_meta_data.eu.colour' />

        <p className='c-product_list__sidebar--filter-title'>Size</p>
        <RefinementList attributeName='variant_meta_data.eu.size' />
      </div>
    )
  }

  renderPagination () {
    return (
      <div role='pagination' className='c-product_list__actions--pagination'>
        <Pagination />
      </div>
    )
  }

  renderSortFilter (indexName) {
    return (
      <div role='Sort' className='c-product_list__actions--sort'>
        <SortBy
          items={[
            { value: indexName, label: 'SortBy' },
            { value: `${indexName}_by_price_asc`, label: 'Price: Low-High' },
            { value: `${indexName}_by_price_desc`, label: 'Price: High-Low' }
          ]}
          defaultRefinement={indexName}
        />
      </div>
    )
  }

  renderActions () {
    return (
      <div className='c-product_list__actions'>
        { this.renderPagination() }
        { this.renderSortFilter(searchConfig.indexName) }
      </div>
    )
  }

  render () {
    let {
      searchState,
      onSearchStateChange,
      resultState,
      categoryID
    } = this.props

    return (
      <div className='s-algolia_instantsearch'>
        <InstantSearch appId={searchConfig.appID}
          apiKey={searchConfig.apiKey}
          indexName={searchConfig.indexName}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          resultState={resultState}>

          <Configure query={searchState.query} hitsPerPage={searchConfig.resultsPerPage} />

          <div className='c-product_list'>
            <div className='c-product_list__container'>
              <section className='c-product_list__sidebar'>
                { this.renderFacets(categoryID) }
              </section>

              <section className='c-product_list__listing'>
                { this.renderSearchStatistics(searchState) }

                { this.renderActions() }

                <div role='product list' className='c-product_list__products'>
                  <Hits hitComponent={Product} />
                </div>

                { this.renderActions() }
              </section>
            </div>
          </div>

        </InstantSearch>
      </div>
    )
  }
}

export { ProductListing, findResultsState }
