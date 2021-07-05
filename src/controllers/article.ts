import { Context } from 'koa'
// import Joi from 'joi'
import { ArticleCreationAttributes, ArticleAttributes } from '../models/article'
import { ArticleService } from '../services/article'

class ArticleController {
  /**
   * 获取文章列表
   */
  static async allList(ctx: Context) {
    const articleList = await ArticleService.findAll()
    ctx.body = ctx.util.success({
      list: articleList,
    })
  }

  /**
   * 获取当前用户的文章列表
   */
  static async currentList(ctx: Context) {
    const { id } = ctx.state.user
    const articleList = await ArticleService.findAllByUserId(id)
    ctx.body = ctx.util.success({
      list: articleList,
    })
  }

  /**
   * 获取当前文章内容信息
   */
  static async getCurrentArticle() {
    // const { id } = ctx.state.user
    // if (id) {
    //   const user = await ArticleService.findByArticleId(id)
    //   ctx.body = ctx.util.success(user)
    // } else {
    //   ctx.body = ctx.util.fail('未找到该用户')
    // }
  }

  /**
   * 创建文章
   */
  static async create(ctx: Context) {
    const { id } = ctx.state.user
    const data = ctx.request.body as ArticleCreationAttributes

    try {
      const article = await ArticleService.create({
        ...data,
        userId: id,
      })
      ctx.body = ctx.util.success(article)
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
   * 更新文章
   */
  static async update(ctx: Context) {
    const { id } = ctx.state.user
    const data = ctx.request.body as Omit<ArticleAttributes, 'userId'>

    console.log(`id`, id)
    console.log(`data`, data)
    const article = await ArticleService.findByArticleId(data.id)

    if (article?.userId !== id) {
      ctx.body = ctx.util.fail('没有权限修改该文章')
      return
    }

    try {
      await ArticleService.updateArticle(data.id, data)
      ctx.body = ctx.util.success()
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

export default ArticleController
