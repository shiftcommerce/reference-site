// Components
import RangeSlider from '../../../client/objects/range-slider'
import InputRange from 'react-input-range'

test('renders the header', () => {
  // Arrange
  const initialProps = {
    min: 5,
    max: 20,
    currentRefinement: { min: 6, max: 12 },
    refine: (nextState) => (nextState),
    canRefine: true
  }

  // Act
  const wrapper = shallow(<RangeSlider {...initialProps} />)

  // Assert
  const valueProp = { min: initialProps.min, max: initialProps.max }

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find(InputRange)).toHaveProp('value', valueProp)
})
