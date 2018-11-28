export const categoryRequest = (categoryId) => {
  return {
    endpoint: `/getCategory/${categoryId}`,
    query: {}
  }
}
