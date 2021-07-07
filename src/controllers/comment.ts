import { Context } from 'koa'
// import Joi from 'joi'
import { CommentCreationAttributes } from '../models/comment'
import { CommentService } from '../services/comment'

class CommentController {
  /**
   * 获取当前文章的评论列表
   * articleId
   */
  static async currentList(ctx: Context) {
    const { articleId } = ctx.request.query as {
      articleId: string
    }
    const commentList = await CommentService.findAllByCommentId(articleId)
    ctx.body = ctx.util.success({
      list: commentList,
    })
  }

  /**
   * 创建评论
   */
  static async create(ctx: Context) {
    const { id } = ctx.state.user
    const data = ctx.request.body as CommentCreationAttributes

    try {
      const comment = await CommentService.create({
        ...data,
        userId: id,
      })
      ctx.body = ctx.util.success(comment)
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
}

export default CommentController
