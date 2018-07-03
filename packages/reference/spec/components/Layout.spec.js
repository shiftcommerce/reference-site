import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// Components
import Layout from '../../components/Layout'
import NavBar from '../../components/navigation/NavBar'
import MiniBag from '../../components/MiniBag'

// Objects
import Logo from '../../objects/Logo'

const store = configureStore([thunk])()

test('renders the header', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout store={store} />
  ).dive()

  const header = wrapper.find('div.o-header')

  // Assert
  expect(header).toBePresent()
  expect(header).toIncludeText('Search')
  expect(header).toContainReact(<Logo className='o-header__logo' />)
  expect(header.find(MiniBag)).toBePresent()
  expect(wrapper).toMatchSnapshot()
})

test('renders the navbar', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout store={store} />
  ).dive()

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(NavBar)).toBePresent()
})

test('renders the footer', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout store={store} />
  ).dive()

  // Assert
  expect(wrapper.find('div.o-footer')).toIncludeText('Footer')
  expect(wrapper).toMatchSnapshot()
})

test('renders the children inside it', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout store={store} >
      Content
    </Layout>
  ).dive()

  // assert
  expect(wrapper.find('div.o-body')).toIncludeText('Content')
  expect(wrapper).toMatchSnapshot()
})
