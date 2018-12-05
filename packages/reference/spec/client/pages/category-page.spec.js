// Pages
import { Category } from '../../../client/pages/category'

// Mock out the next/config
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    ALGOLIA_RESULTS_PER_PAGE: 4
  }
}))

describe('algoliaGetDerivedStateFromProps', () => {
  test('updates category id in state when it changes in props', () => {
    expect(Category.algoliaGetDerivedStateFromProps(
      { id: 10 },
      { categoryId: 9 }
    )).toEqual({ categoryId: 10 })
  })
})

describe('algoliaComponentDidUpdate', () => {
  test("doesn't update state when searchState has changed", () => {
    const mockThis = {
      setState: jest.fn(),
      state: {
        searchState: {
          a: 1,
          b: 3
        }
      }
    }

    Category.algoliaComponentDidUpdate.call(mockThis, {}, { searchState: { a: 1, b: 2 } })

    expect(mockThis.setState).not.toHaveBeenCalled()
  })

  test('updates the category filter and sets page number to 1 when categoryId is set', () => {
    const mockThis = {
      setState: jest.fn(),
      state: {
        categoryId: 20,
        searchState: {
          a: 1,
          configure: {
            someConfig: 'someValue'
          }
        }
      }
    }

    Category.algoliaComponentDidUpdate.call(mockThis, {}, { searchState: { categoryId: 10 } })

    expect(mockThis.setState).toHaveBeenCalledWith({
      searchState: {
        a: 1,
        configure: {
          someConfig: 'someValue',
          filters: 'category_ids:20'
        },
        page: 1
      }
    })
  })

  test('when search state and category ids are the same it updates search state to match the state from the url', () => {
    const mockThis = {
      setState: jest.fn(),
      state: {
        categoryId: 20,
        searchState: {
          query: '300ml'
        }
      }
    }

    window.history.pushState({}, 'Test Title', '/search?query=600ml')

    Category.algoliaComponentDidUpdate.call(mockThis,
      { id: 20, searchState: { configure: { config: 'config' } } },
      { categoryId: 20, searchState: { query: '300ml' } }
    )

    expect(mockThis.setState).toHaveBeenCalledWith({
      currentId: 20,
      searchState: {
        configure: {
          config: 'config'
        },
        query: '600ml'
      }
    })

    window.history.pushState({}, 'Test Title', '/')
  })
})
