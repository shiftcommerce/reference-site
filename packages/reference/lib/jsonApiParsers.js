/*
* Parses Returned Resource Collection
* Along With Their Included Resources
*/
export function parseJsonApiResources (payload) {
  const resourceCollection = payload.data
  const includedResources = payload.included
  let parsedResourceCollection = []

  if (resourceCollection) {
    resourceCollection.forEach((resource, idx) => {
      parsedResourceCollection.push(parseResource(resource, includedResources))
    })
  }
  return { data: parsedResourceCollection, pagination: paginationData(payload) }
}

/*
* Parses Returned Resource & Its Included Resources
*/
export function parseJsonApiResource (payload) {
  const resourceData = payload.data
  const includedResources = payload.included
  let parsedResource = {}

  if (resourceData) {
    parsedResource = parseResource(resourceData, includedResources)
  }
  return parsedResource
}

/*
* Parses A Single Resource
*/
function parseResource (resourceData, includedResources) {
  return Object.assign(
    { id: resourceData.id },
    resourceData.attributes,
    parseRelationships(resourceData.relationships, includedResources)
  )
}

/*
* Parses Resource Collections contained within the Relationships
*/
function parseRelationships (relationships, includedResources) {
  let parsedRelationships = {}

  if (relationships) {
    Object.entries(relationships).forEach(([key, value]) => {
      if (value.data) {
        parsedRelationships[key] = filterIncludedResources(key, value.data.map((resource) => (resource.id)), includedResources)
      } else {
        parsedRelationships[key] = []
      }
    })
  }
  return parsedRelationships
}

/*
* Filters Included Resources Based On the Type and ResourceIDs provided
*/
function filterIncludedResources (type, resourceIDs, includedResources) {
  let resources = []

  if (includedResources) {
    includedResources.map((resource, idx) => {
      if (resource.type === type && resourceIDs.includes(resource.id)) {
        resources.push(parseResource(resource, includedResources))
      }
    })
  }
  return resources
}

/*
* Consolidates Pagination Data
* Basic implementation. Further work required to calculate total_pages etc
*/
function paginationData (payload) {
  return Object.assign({}, payload.meta, payload.links)
}
