import ExampleComponent from '../../components/ExampleComponent'

test('renders the correct output', () => {
  // arrange

  // act
  const wrapper = mount(
    <ExampleComponent this={1} that={2} />
  )

  // assert
  expect(wrapper).toIncludeText('The output of 1 + 2 is 3')
})
