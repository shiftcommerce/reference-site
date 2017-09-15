// Components
import Layout from '../../components/Layout'
import NavBar from '../../components/navigation/NavBar'
import MiniBag from '../../components/MiniBag'
import SearchBar from '../../components/SearchBar'

// Objects
import Image from '../../objects/Image'

test('renders the header', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout />
  )

  const header = wrapper.find('div.o-header')

  // Assert
  expect(header).toBePresent()
  expect(header).toIncludeText('Search')
  expect(header).toContainReact(<Image width={250} height={35} />)
  expect(header).toContainReact(<MiniBag />)
})

test('renders the navbar', () => {
  // Arrange

  // Act
  const wrapper = shallow(<Layout />)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(NavBar)).toBePresent()
})

test('renders the footer', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <Layout />
  )

  // Assert
  expect(wrapper.find('div.o-footer')).toIncludeText('Footer')
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
})
