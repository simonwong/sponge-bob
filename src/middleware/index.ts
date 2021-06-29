import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import config from 'config'

const codeMap = {
  '-1': 'fail',
  200: 'success',
  401: 'token expired',
  500: 'server error',
  10001: 'params error',
}

type Code = keyof typeof codeMap

export const utilFn = {
  success(data?: any) {
    return {
      code: 200,
      success: true,
      message: codeMap['200'],
      data: data || null,
    }
  },
  fail(message: any, code: Code = '-1', data?: any) {
    return {
      code,
      success: false,
      message: message || codeMap[code],
      data: data || null,
    }
  },
}

const allowNoTokenPaths = ['/api/user/register', '/api/user/login']
const { secret } = config.get('jwt')

class MiddleWare {
  static util(ctx: Context, next: Next) {
    // X-Request-ID是客户可以创建一些随机ID并将其传递给服务器。
    // 然后服务器将该ID包含在它创建的每个日志语句中。
    // 如果客户端收到错误，它可以在错误报告中包含该ID，
    // 从而允许服务器操作员查找相应的日志语句（而不必依赖时间戳，IP等）
    // ctx.set('X-Request-Id', ctx.req.id)
    ctx.util = utilFn
    return next()
  }

  static jwt(ctx: Context, next: Next) {
    if (allowNoTokenPaths.includes(ctx.path)) {
      return next()
    }
    const { authorization } = ctx.req.headers

    if (!authorization || typeof authorization !== 'string') {
      ctx.body = utilFn.fail('当前用户未登录，请先登录', 401)
      return null
    }
    const [, token] = authorization?.match(/^Bearer (.+)/) || []

    try {
      // FIXME: token 有可能是之前老的但又没过期，会被认为是 ok 的
      // 应不应该去库里查一下？
      const verified = jwt.verify(token, secret)

      if (typeof verified !== 'string') {
        ctx.state.user = {
          id: verified.id,
          email: verified.email,
        }
      } else {
        ctx.state.user = { id: verified }
      }
    } catch (e) {
      // token 无效 、过期 统一处理
      console.log(e)
      ctx.body = utilFn.fail('登录已过期，请重新登录', 401)
      return null
    }
    return next()
  }
}

export default MiddleWare
