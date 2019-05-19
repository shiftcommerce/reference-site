const glob = require('glob')
const { CIRCLE_NODE_INDEX, CIRCLE_NODE_TOTAL } = process.env

const files = glob.sync('packages/reference/cypress/integration/**/*.js')

const groupSize = Math.ceil(files.length / parseInt(CIRCLE_NODE_TOTAL))
const groupOffset = parseInt(CIRCLE_NODE_INDEX) * groupSize
const group = files.slice(groupOffset, groupOffset + groupSize)

console.log(group.join(','))
