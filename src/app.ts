import * as Koa from 'koa'

import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
// const cors = require('koa2-cors')

import './models/mongoose'
import middleware from './middlewares'
import routerConfig from './routerConfig'

const app = new Koa()

// 将POST请求的formData数据解析到ctx.requset.body中
app
  .use(bodyParser())
  .use(logger())
  .use(middleware.util)
  .use(routerConfig.routes())
  .use(routerConfig.allowedMethods())


app.listen(3001, () => {
  console.log('starting server at port 3001')
})
