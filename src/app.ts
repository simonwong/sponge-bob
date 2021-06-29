import Koa from 'koa'

import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
// const cors = require('koa2-cors')

import middleware from './middleware'
import routerConfig from './routerConfig'

const app = new Koa()

app
  .use(bodyParser())
  .use(logger())
  .use(middleware.util)
  .use(middleware.jwt)
  .use(routerConfig.routes())
  .use(routerConfig.allowedMethods())

app.listen(3001, () => {
  console.log('starting server at port 3001')
})
