import Image from '../../../client/objects/Image'

test('renders a box of given size', () => {
  // arrange

  // act
  const wrapper = shallow(
    <Image height='35px' width='125px' />
  )

  // assert
  expect(wrapper.find('div.c-dummy_image')).toHaveStyle('height', '35px')
  expect(wrapper.find('div.c-dummy_image')).toHaveStyle('width', '125px')
})

test('renders image if url provided', () => {
  // arrange

  // act
  const wrapper = shallow(
    <Image src='www.someimageurl.com' className='c-some_class' height='auto' width='90%' />
  )

  // assert
  expect(wrapper.find('img')).toHaveProp('src', 'www.someimageurl.com')
  expect(wrapper.find('img')).toHaveProp('height', 'auto')
  expect(wrapper.find('img')).toHaveProp('width', '90%')
  expect(wrapper.find('div')).toHaveClassName('c-some_class')
})
