import ConditionalLink from '../../../client/objects/conditional-link'
import Link from 'next/link'

describe('ConditionalLink', () => {
  test('wraps its children in a link if link is present', () => {
    // Arrange
    const childText = 'Test child text'
    const href = 'https://example.com'

    // Act
    const wrapper = mount(
      <ConditionalLink href={href} >
        <div>{ childText }</div>
      </ConditionalLink>
    )

    // Assert
    // Check anchor and Link tags are rendered
    expect(wrapper.find(Link).exists()).toBeTruthy()
    expect(wrapper.find('a')).toHaveProp('href', href)
    // Check child components are rendered
    expect(wrapper.find('a div')).toHaveText(childText)
  })

  test('does not wrap its children if link is not present', () => {
    // Arrange
    const childText = 'Test child text'

    // Act
    const wrapper = mount(
      <ConditionalLink>
        <div>{ childText }</div>
      </ConditionalLink>
    )

    // Assert
    // Check anchor and Link tags are not rendered
    expect(wrapper.find(Link).exists()).toBeFalsy()
    expect(wrapper.find('a').exists()).toBeFalsy()
    // Check child elements are still rendered
    expect(wrapper.find('div')).toHaveText(childText)
  })

  test('does not wrap its children if link is undefined', () => {
    // Arrange
    const childText = 'Test child text'
    const href = undefined

    // Act
    const wrapper = mount(
      <ConditionalLink href={href} >
        <div>{ childText }</div>
      </ConditionalLink>
    )

    // Assert
    // Check anchor and Link tags are not rendered
    expect(wrapper.find(Link).exists()).toBeFalsy()
    expect(wrapper.find('a').exists()).toBeFalsy()
    // Check child elements are still rendered
    expect(wrapper.find('div')).toHaveText(childText)
  })
})
