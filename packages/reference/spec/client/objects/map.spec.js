// Objects
import Map from '../../../client/objects/map'

test('renders correctly', () => {
  // act
  const wrapper = shallow(
    <Map/>
  )

  // assert
  expect(wrapper).toMatchSnapshot()
})
