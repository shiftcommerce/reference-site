import ExampleComponent from '../../../client/components/example-component'

test('renders the correct output', () => {
  // arrange

  // act
  const wrapper = mount(
    <ExampleComponent thisProp={1} thatProp={2} />
  )

  // assert
  expect(wrapper).toIncludeText('The output of 1 + 2 is 3')
})
