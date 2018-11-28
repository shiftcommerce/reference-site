export const pageRequest = (pageId) => {
  return {
    endpoint: `/getStaticPage/${pageId}`,
    query: {
      include: 'template,meta.*'
    }
  }
}
