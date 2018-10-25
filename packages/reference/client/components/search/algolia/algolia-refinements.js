import { connectCurrentRefinements } from 'react-instantsearch/connectors'

const AlgoliaRefinements = connectCurrentRefinements(({ items }) => {
  return `${items.length} of 3`
})

export default AlgoliaRefinements
