import Link from 'next/link'

export default (props) => {
  const { href, as, children, shallow, ...otherProps } = props

  return (
    <Link href={href} as={as} shallow={shallow}>
      <a {...otherProps}>{ children }</a>
    </Link>
  )
}
