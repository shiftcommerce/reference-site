import React, { Component } from 'react'
import SearchFilters from './search-filters'

export class GlobalSearchFilters extends Component {
  getFacets () {
    return [
      {
        label: 'Gender',
        aggregation_type: 'list',
        searchable: false,
        source: 'product_meta_data.gender'
      },
      {
        label: 'Category',
        aggregation_type: 'list',
        searchable: false,
        source: 'category_id'
      },
      {
        label: 'Price',
        aggregation_type: 'range',
        searchable: false,
        source: 'current_price'
      },
      {
        label: 'Brand',
        aggregation_type: 'list',
        searchable: false,
        source: 'product_meta_data.brand'
      },
      {
        label: 'Size',
        aggregation_type: 'list',
        searchable: false,
        source: 'meta_data.short_size'
      },
      {
        label: 'Rating',
        aggregation_type: 'list',
        searchable: false,
        source: 'product_rating'
      },
      {
        label: 'Season',
        aggregation_type: 'list',
        searchable: false,
        source: 'product_meta_data.season'
      },
      {
        label: 'Technical',
        aggregation_type: 'list',
        searchable: false,
        source: 'product_meta_data.technical'
      },
      {
        label: 'Waterproof',
        aggregation_type: 'list',
        searchable: false,
        source: 'product_meta_data.waterproof'
      },
      {
        label: 'Wind Resistant',
        aggregation_type: 'list',
        searchable: false,
        source: 'product_meta_data.wind_resistant'
      }
    ]
  }

  render () {
    const facets = this.getFacets()
    return (
      <SearchFilters facets={facets}/>
    )
  }
}

export default GlobalSearchFilters
