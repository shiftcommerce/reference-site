import HeroImage from '../../components/HeroImage'
import Image from '../../objects/Image'
import Link from 'next/link'

test('renders the full component', () => {
  // arrange

  // act
  const wrapper = shallow(
    <HeroImage heroImage='www.someimageurl.com' heroUrl='/mens' linkUrl='/more_mens' linkText='Click Me Please' title='Title' message='Important Text' />
  )

  // assert
  expect(wrapper).toExist()
  expect(wrapper).toContainReact(<Link href='/mens'><a><Image src='www.someimageurl.com' width='90%' height={450} /></a></Link>)
  expect(wrapper.find('div.c-title')).toIncludeText('Title')
  expect(wrapper).toIncludeText('Important Text')
  expect(wrapper).toContainReact(<Link href='/more_mens'><a className='o-button o-button--lrg'>Click Me Please</a></Link>)
})
