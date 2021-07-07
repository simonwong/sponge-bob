import Router from 'koa-router'
import UserController from './controllers/user'
import ArticleController from './controllers/article'
import CommentController from './controllers/comment'

const apiRouter = new Router({ prefix: '/api' })

apiRouter.get('/user', UserController.getCurrentUser)
apiRouter.get('/user/list', UserController.list)
apiRouter.post('/user/register', UserController.register)
apiRouter.post('/user/login', UserController.login)

apiRouter.get('/articleList', ArticleController.allList)
apiRouter.get('/article', ArticleController.currentList)
apiRouter.post('/article', ArticleController.create)
apiRouter.put('/article', ArticleController.update)

apiRouter.get('/comment', CommentController.currentList)
apiRouter.post('/comment', CommentController.create)

export default apiRouter
