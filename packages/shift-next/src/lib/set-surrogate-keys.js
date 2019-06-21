const setSurrogateKeys = (headers, req, res) => {
  if (req && res) {
    const currentKey = res.get('surrogate-key')
    const responseKey = headers['surrogate-key']

    if (responseKey) {
      if (!currentKey) {
        res.set('surrogate-key', responseKey)
        res.set('surrogate-control', headers['surrogate-control'])
      } else {
        const currentParts = currentKey.split(' ')
        const responseParts = responseKey.split(' ')
        const combinedKey = [ ...new Set(currentParts.concat(responseParts)) ].join(' ')
        res.set('surrogate-key', combinedKey)
      }
    }
  }
}

export default setSurrogateKeys
