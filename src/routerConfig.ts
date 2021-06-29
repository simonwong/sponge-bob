import Router from 'koa-router'
import UserController from './controllers/user'

const apiRouter = new Router({ prefix: '/api' })

apiRouter.get('/user', UserController.getCurrentUser)
apiRouter.get('/user/list', UserController.list)
apiRouter.post('/user/register', UserController.register)
apiRouter.post('/user/login', UserController.login)

export default apiRouter
