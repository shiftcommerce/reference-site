import Link from 'next/link'

export default (props) => {
  const { href, as, children, ...otherProps } = props

  return (
    <Link href={href} as={as}>
      <a {...otherProps}>{ children }</a>
    </Link>
  )
}
