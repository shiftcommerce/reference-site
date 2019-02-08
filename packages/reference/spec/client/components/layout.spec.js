// Components
import { Layout } from '../../../client/components/layout'
import NavBar from '../../../client/components/navigation/navbar'
import MiniBag from '../../../client/components/mini-bag'

// Objects
import { Logo } from 'shift-react-components'

test('renders the header', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout />
  )

  const header = wrapper.find('div.o-header')

  // Assert
  expect(header).toExist()
  expect(header).toContainReact(<Logo className="o-header__logo" logoSrc="../static/shopgo-logo.svg" />)
  expect(header.find(MiniBag)).toExist()
  expect(wrapper).toMatchSnapshot()
})

test('renders the navbar', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(NavBar)).toExist()
})

test('renders the footer', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout />
  )

  // Assert
  expect(wrapper.find('div.o-footer')).toIncludeText('Footer')
  expect(wrapper).toMatchSnapshot()
})

test('renders the children inside it', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout>
      Content
    </Layout>
  )

  // assert
  expect(wrapper.find('div.o-body')).toIncludeText('Content')
  expect(wrapper).toMatchSnapshot()
})
