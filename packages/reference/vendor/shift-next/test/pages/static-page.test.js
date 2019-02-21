import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

import StaticPage from '../../src/pages/static-page'
import * as renderComponents from '../../src/lib/render-components'
import Config from '../../src/lib/config'

axios.defaults.adapter = httpAdapter

nock.disableNetConnect()

afterEach(() => { nock.cleanAll() })

const page = {
  template: {
    sections: [{
      components: ['component1', 'component2']
    }]
  }
}

test('renders components defined in the first template section', () => {
  const renderComponentsMock = jest.spyOn(renderComponents, 'default')

  shallow(<StaticPage page={page} />, { disableLifecycleMethods: true })

  expect(renderComponentsMock).toHaveBeenCalledWith(['component1', 'component2'])

  renderComponentsMock.mockRestore()
})

describe('page title', () => {
  test('renders correct page title for non-homepage pages', () => {
    Config.set({ storeName: 'MyStore' })

    const wrapper = shallow(<StaticPage page={Object.assign({}, page, { title: 'Deliveries' })} />, { disableLifecycleMethods: true })

    expect(wrapper).toContainReact(<title>Deliveries - MyStore</title>)
  })

  test('renders just the store name as title for the homepage', () => {
    Config.set({ storeName: 'MyStore' })

    const wrapper = shallow(<StaticPage page={Object.assign({}, page, { title: 'Homepage' })} />, { disableLifecycleMethods: true })

    expect(wrapper).toContainReact(<title>MyStore</title>)
  })
})

describe('getInitialProps()', () => {
  test('returns the id from the query when run client side', async () => {
    expect(await StaticPage.getInitialProps({ query: { id: 10 } })).toEqual({ id: 10 })
  })

  test('fetches and returns the page when run server side', async () => {
    Config.set({ apiHostProxy: 'http://example.com' })

    const pageRequest = nock(/example\.com/)
      .get('/getStaticPage/10')
      .query(true)
      .reply(200, {
        id: 10,
        title: 'Test Page'
      })

    expect(await StaticPage.getInitialProps({ query: { id: 10 }, req: true })).toEqual({
      id: 10,
      page: {
        id: 10,
        title: 'Test Page'
      }
    })
    expect(pageRequest.isDone()).toBe(true)
  })
})

describe('componentDidMount()', () => {
  test('fetches the static page, puts it in the state and sets loading to false', async () => {
    Config.set({ apiHostProxy: 'http://example.com' })

    const pageRequest = nock(/example\.com/)
      .get('/getStaticPage/10')
      .query(true)
      .reply(200, {
        id: 10,
        title: 'Test Page'
      })

    const wrapper = shallow(<StaticPage id={10} page={page} />, { disableLifecycleMethods: true })

    await wrapper.instance().componentDidMount()

    expect(wrapper.instance().state).toEqual(expect.objectContaining({
      loading: false,
      page: {
        id: 10,
        title: 'Test Page'
      }
    }))
    expect(pageRequest.isDone()).toBe(true)
  })
})

describe('componentDidUpdate()', () => {
  test("is a no-op if currentId in state hasn't changed", async () => {
    const wrapper = shallow(<StaticPage id={10} page={page} />, { disableLifecycleMethods: true })

    expect(wrapper.instance().state).toEqual(expect.objectContaining({
      currentId: 10
    }))

    expect(await wrapper.instance().componentDidUpdate({}, { currentId: 10 })).toEqual(undefined)
  })

  test('fetches the static page, puts it in the state and sets loading to false if currentId changed', async () => {
    Config.set({ apiHostProxy: 'http://example.com' })

    // The requests is made to /10 but in reality props.id would have changed to 11 too
    const pageRequest = nock(/example\.com/)
      .get('/getStaticPage/10')
      .query(true)
      .reply(200, {
        id: 11,
        title: 'Test Page 11'
      })

    const wrapper = shallow(<StaticPage id={10} page={page} />, { disableLifecycleMethods: true })

    expect(wrapper.instance().state).toEqual(expect.objectContaining({
      currentId: 10
    }))

    await wrapper.instance().componentDidUpdate({}, { currentId: 11 })

    expect(wrapper.instance().state).toEqual(expect.objectContaining({
      loading: false,
      page: {
        id: 11,
        title: 'Test Page 11'
      }
    }))
    expect(pageRequest.isDone()).toBe(true)
  })
})

describe('getDerivedStateFromProps()', () => {
  test("sets the currentId to id from props if there isn't one in state to start with", () => {
    expect(StaticPage.getDerivedStateFromProps({ id: 7 }, {})).toEqual({ currentId: 7 })
  })

  test('sets the currentId to id from props and loading to true if the id in props has changed', () => {
    expect(StaticPage.getDerivedStateFromProps({ id: 7 }, { currentId: 6 })).toEqual({ currentId: 7, loading: true })
  })

  test('is a no-op if currentId matches id from props', () => {
    expect(StaticPage.getDerivedStateFromProps({ id: 7 }, { currentId: 7 })).toBe(null)
  })
})
