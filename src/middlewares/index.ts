type Code = '-1' | 200 | 401 | 500 | 10001
interface IResultData {
  code: Code
  success: boolean
  message: string
  data: any
}

export interface IUtilFn {
  resuccess: (data: any) => IResultData
  refail: (message?: string, code?: Code, data?: any) => IResultData
}

const codeMap = {
  '-1': 'fail',
  200: 'success',
  401: 'token expired',
  500: 'server error',
  10001: 'params error',
}

const utilFn: IUtilFn = {
  resuccess(data) {
    return {
      code: 200,
      success: true,
      message: codeMap['200'],
      data: data || null,
    }
  },
  refail(message, code = '-1', data) {
    return {
      code,
      success: false,
      message: message || codeMap[code],
      data: data || null,
    }
  },
}

class MiddleWare {
  static util(ctx, next) {
    // X-Request-ID是客户可以创建一些随机ID并将其传递给服务器。
    // 然后服务器将该ID包含在它创建的每个日志语句中。
    // 如果客户端收到错误，它可以在错误报告中包含该ID，
    // 从而允许服务器操作员查找相应的日志语句（而不必依赖时间戳，IP等）
    ctx.set('X-Request-Id', ctx.req.id)
    ctx.util = utilFn
    return next()
  }
}

export default MiddleWare
