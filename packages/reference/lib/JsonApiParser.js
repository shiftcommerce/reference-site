class JsonApiParser {
  parse (payload) {
    if (Array.isArray(payload.data)) {
      return this.parseCollection(payload)
    } else if (typeof payload === 'object') {
      return this.parseResource(payload)
    }
  }

  parseCollection (payload) {
    const resourceCollection = payload.data
    const includedResources = payload.included
    let parsedResourceCollection = []

    if (resourceCollection) {
      resourceCollection.forEach((resource, idx) => {
        parsedResourceCollection.push(this.parseResourceData(resource, includedResources))
      })
    }
    return {
      data: parsedResourceCollection,
      pagination: Object.assign({}, payload.meta, payload.links)
    }
  }

  parseResource (payload) {
    const resourceData = payload.data
    const includedResources = payload.included
    let parsedResource = {}

    if (resourceData) {
      parsedResource = this.parseResourceData(resourceData, includedResources)
    }
    return parsedResource
  }

  parseResourceData (resourceData, includedResources) {
    return Object.assign(
      { id: resourceData.id },
      resourceData.attributes,
      this.parseRelationships(resourceData.relationships, includedResources)
    )
  }

  /*
  * Parses Resource Collections contained within the Relationships
  */
  parseRelationships (relationships, includedResources) {
    let parsedRelationships = {}

    if (relationships) {
      Object.entries(relationships).forEach(([key, value]) => {
        if (value.data) {
          parsedRelationships[key] = this.filterIncludedResources(key, value.data.map((resource) => (resource.id)), includedResources)
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
  filterIncludedResources (type, resourceIDs, includedResources) {
    let resources = []

    if (includedResources) {
      includedResources.map((resource, idx) => {
        if (resource.type === type && resourceIDs.includes(resource.id)) {
          resources.push(this.parseResourceData(resource, includedResources))
        }
      })
    }
    return resources
  }
}

export default JsonApiParser
