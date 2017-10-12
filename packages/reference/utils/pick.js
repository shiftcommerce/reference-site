export default function pick (object, ...props) {
  return Object.assign({}, ...props.map(prop => ({[prop]: object[prop]})))
}
