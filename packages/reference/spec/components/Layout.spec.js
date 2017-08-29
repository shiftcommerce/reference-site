import Layout from '../../components/Layout'

test('renders the header and footer', () => {
  // arrange

  // act
  const wrapper = mount(
    <Layout />
  )

  // assert
  expect(wrapper.find('div.header')).toIncludeText('Header')
  expect(wrapper.find('div.footer')).toIncludeText('Footer')
})

test('renders the children inside it', () => {
  // arrange

  // act
  const wrapper = mount(
    <Layout>
      Content
    </Layout>
  )

  // assert
  expect(wrapper.find('div.body')).toIncludeText('Content')
})
