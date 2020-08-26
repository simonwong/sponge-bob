import Koa from 'koa'

import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
// const cors = require('koa2-cors')

import './models/mongoose'
import middleware from './middlewares'
import routerConfig from './routerConfig'

const app = new Koa()

var a = 1;

app
  .use(bodyParser())
  .use(logger())
  .use(middleware.util)
  .use(routerConfig.routes())
  .use(routerConfig.allowedMethods())


app.listen(3001, () => {
  console.log('starting server at port 3001')
})
