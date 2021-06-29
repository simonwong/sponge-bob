import { Context } from 'koa'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
import { UserCreationAttributes, UserLoginAttributes } from '../models/user'
import { UserService } from '../services/user'

const { secret, expire } = config.get('jwt')

class UserController {
  /**
   * 获取用户列表
   */
  static async list(ctx: Context) {
    const userList = await UserService.findAll()
    ctx.body = ctx.util.success({
      list: userList,
    })
  }

  /**
   * 获取当前用户信息
   */
  static async getCurrentUser(ctx: Context) {
    const { id } = ctx.state.user
    if (id) {
      const user = await UserService.findByUserId(id)
      ctx.body = ctx.util.success(user)
    } else {
      ctx.body = ctx.util.fail('未找到该用户')
    }
  }

  /**
   * 注册用户
   */
  static async register(ctx: Context) {
    const data = ctx.request.body as UserCreationAttributes
    const salt = await bcrypt.genSalt()
    data.password = await bcrypt.hash(data.password, salt)

    try {
      const user = await UserService.create(data)
      ctx.body = ctx.util.success(user)
    } catch (e) {
      if (e.errors) {
        ctx.body = ctx.util.fail(
          e.errors.map((item: any) => item.message).join(','),
        )
      } else {
        throw e
      }
    }
  }

  /**
   * 用户登录
   */
  static async login(ctx: Context) {
    const { email, password } = ctx.request.body as UserLoginAttributes
    const user = await UserService.findByEmail(email)

    if (user) {
      const isRightPwd = await bcrypt.compare(password, user?.password)

      if (isRightPwd) {
        // 生成 token 并 update
        const token = jwt.sign({ id: user.id, email }, secret, {
          expiresIn: expire,
        })
        await UserService.updateUserToken(user.id, token)
        user.token = token
        // 登录成功
        ctx.body = ctx.util.success({ token })
      } else {
        // 密码错误
        ctx.body = ctx.util.fail('密码错误')
      }
    } else {
      ctx.body = ctx.util.fail('当前邮箱未注册，请先注册')
    }
  }
}

export default UserController
