// Libraries
import { Component } from 'react'
import { Configure, HierarchicalMenu, SortBy, Hits, CurrentRefinements, ClearAll, RefinementList, Pagination } from 'react-instantsearch/dom'
import { createInstantSearch } from 'react-instantsearch/server'

// Components
import ProductHit from './ProductHit'

// Constants
const { InstantSearch, findResultsState } = createInstantSearch()

class PLP extends Component {
  constructor (props) {
    super(props)
    this.transformItems = this.transformItems.bind(this)
  }

  transformItems (items) {
    let result = items.filter((item) => {
      return (item.currentRefinement !== this.props.category && item.attributeName === 'category') || item.attributeName !== 'category'
    })
    return result
  }

  renderFacetHeader (category) {
    return (
      <div className='o-product_list__current_refinements'>
        <CurrentRefinements transformItems={this.transformItems} />
        <ClearAll transformItems={this.transformItems} />
      </div>
    )
  }

  renderFacets (category) {
    return (
      <section className='o-product_list__actions--filter'>
        { this.renderFacetHeader(category) }

        <h2>Category</h2>
        <HierarchicalMenu
          attributes={[
            'category',
            'sub_category',
            'sub_sub_category'
          ]}
          selector='>'
          defaultRefinement={category}
          rootPath={category}
          showMore
          showParentLevel={false}
        />
        <h2>Type</h2>
        <RefinementList attributeName='type' />
        <h2>Size</h2>
        <RefinementList attributeName='sizes' />
        <h2>Material</h2>
        <RefinementList attributeName='materials' />
      </section>
    )
  }

  renderSortFilter () {
    return (
      <div role='Sort'>
        <SortBy
          items={[
            { value: 'ikea', label: 'Featured' },
            { value: 'ikea_price_asc', label: 'Price asc.' },
            { value: 'ikea_price_desc', label: 'Price desc.' }
          ]}
          defaultRefinement='ikea'
        />
      </div>
    )
  }

  render () {
    let {
      searchState,
      onSearchStateChange,
      resultState,
      category
    } = this.props

    return (
      <div className='s-algolia_instantsearch'>
        <InstantSearch appId={process.env.ALGOLIA_APP_ID} apiKey={process.env.ALGOLIA_APP_KEY} indexName={process.env.ALGOLIA_INDEX_NAME} searchState={searchState} onSearchStateChange={onSearchStateChange} resultState={resultState} >

          <Configure query={searchState.query} hitsPerPage='36' />

          <section className='o-product_list'>
            <section className='o-product_list__container'>
              { this.renderFacets(category) }

              <section className='o-product_list__products'>
                <section className='o-product_list__actions--sort o-row'>
                  <div role='pagination'>
                    <Pagination />
                  </div>

                  { this.renderSortFilter() }
                </section>

                <section role='message' className='o-product_list-message o-row' />

                <section role='product list' >
                  <Hits hitComponent={ProductHit} />
                </section>

                <section className='o-product_list__actions--sort o-row'>
                  <div role='pagination'>
                    <Pagination />
                  </div>

                  { this.renderSortFilter() }
                </section>
              </section>
            </section>
          </section>

        </InstantSearch>
      </div>
    )
  }
}

export { PLP, findResultsState }
