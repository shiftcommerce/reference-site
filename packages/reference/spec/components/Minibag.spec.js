import Minibag from '../../components/Minibag'
import Link from 'next/link'

test('renders the minibag links', () => {
  // arrange

  // act
  const wrapper = shallow(
    <Minibag />
  )

  // assert
  expect(wrapper).toContainReact(<Link href='/cart'><a aria-label='View your cart'>View Your Bag</a></Link>)
  expect(wrapper).toContainReact(<Link href='/checkout'><a className='c-button c-button--negative c-button--lrg' aria-label='Go to checkout'>CHECKOUT</a></Link>)
})