import Link from 'next/link'

export default (props) => {
  const { href, as, className, children, onClick } = props
  return (
    <Link href={href} as={as}>
      <a className={className} onClick={onClick}>{ children }</a>
    </Link>
  )
}
