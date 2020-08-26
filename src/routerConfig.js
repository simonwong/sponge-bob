import Router from 'koa-router'
import ArticleController from './controllers/article'
// const {
//     article,
// } = require('./controllers')

const apiRouter = new Router({ prefix: '/api' })

apiRouter
  .get('/article', ArticleController.list)
// .post('/article/delete', ArticleController.delete)
// .post('/article/add', ArticleController.add)

export default apiRouter
