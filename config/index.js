const development = require('./development.js')
const product = require('./product.js')

module.export = process.env.NODE_ENV === 'product' ? product : development
