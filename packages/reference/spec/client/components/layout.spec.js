// Components
import { Layout } from '../../../client/components/layout'
import CustomHead from '../../../client/components/custom-head'

// Objects
import { Logo, Minibag, NavBar } from 'shift-react-components'

test('renders the header', () => {
  // Act
  const wrapper = shallow(
    <Layout router={{ pathname: '/' }}/>
  )

  const header = wrapper.find('div.o-header')

  // Assert
  expect(header).toExist()
  expect(header).toContainReact(<Logo className="o-header__logo" logoSrc="../static/shopgo-logo.svg" />)
  expect(header.find(Minibag)).toExist()
  expect(wrapper).toMatchSnapshot()
})

test('renders the navbar for non-checkout pages', () => {
  // Act
  const wrapper = shallow(
    <Layout router={{ pathname: '/' }}/>
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(NavBar)).toExist()
})

test('renders the footer', () => {
  // Act
  const wrapper = shallow(
    <Layout router={{ pathname: '/' }}/>
  )

  // Assert
  expect(wrapper.find('div.o-footer')).toIncludeText('Footer')
  expect(wrapper).toMatchSnapshot()
})

test('renders the children inside it', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout router={{ pathname: '/' }}>
      Content
    </Layout>
  )

  // assert
  expect(wrapper.find('div.o-body')).toIncludeText('Content')
  expect(wrapper).toMatchSnapshot()
})

test('for checkout pages renders the custom head only', () => {
  // Act
  const wrapper = shallow(
    <Layout router={{ pathname: '/checkout/shipping-address' }}/>
  )

  // Assert
  expect(wrapper.find(NavBar).exists()).toBe(false)
  expect(wrapper).toContainReact(<CustomHead />)
})
