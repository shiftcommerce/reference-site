import Link from 'next/link'

export default (props) => {
  const { href, as, className, children } = props
  return (
    <Link href={href} as={as}>
      <a className={className}>{ children }</a>
    </Link>
  )
}
