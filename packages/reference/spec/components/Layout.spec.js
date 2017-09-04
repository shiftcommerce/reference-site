import Layout from '../../components/Layout'
import NavBar from '../../components/NavBar'
import Minibag from '../../components/Minibag'
import Image from '../../objects/Image'
import SearchBar from '../../components/SearchBar'

test('renders the header', () => {
  // arrange

  // act
  const wrapper = shallow(
    <Layout />
  )

  const header = wrapper.find('div.o-header')

  // assert
  expect(header).toBePresent()
  expect(header).toContainReact(<Image width={ 250 } height={ 35 } />)
  expect(header).toContainReact(<SearchBar />)
  expect(header).toContainReact(<Minibag />)
})

test('renders the navbar', () => {
  // arrange

  // act
  const wrapper = shallow(
    <Layout />
  )

  // assert
  expect(wrapper).toContainReact(<NavBar />)
})

test('renders the footer', () => {
  // arrange

  // act
  const wrapper = shallow(
    <Layout />
  )

  // assert
  expect(wrapper.find('div.o-footer')).toIncludeText('Footer')
})

test('renders the children inside it', () => {
  // arrange

  // act
  const wrapper = shallow(
    <Layout>
      Content
    </Layout>
  )

  // assert
  expect(wrapper.find('div.o-body')).toIncludeText('Content')
})
