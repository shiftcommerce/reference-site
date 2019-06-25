const filterResponse = ({ status, data, headers }) => {
  return { status, data, headers }
}

module.exports = filterResponse