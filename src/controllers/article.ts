import * as Application from 'koa'
import ArticleProxy from '../proxy/article'

class ArticleControllers {
  /**
   * 获取文章列表
   */
  static async list(ctx: Application.Context) {
    const articles = await ArticleProxy.find(ctx.params)
    ctx.body = ctx.util.resuccess({
      list: articles,
    })
  }

  // /**
  //  * 添加文章
  //  */
  // static async add (ctx) {
  //     const { body } = ctx.request
  //     // TODO: 非空验证
  //     const result = await ArticleProxy.addNew(body)
  //     ctx.body = ctx.util.resuccess()
  // }

  // /**
  //  * 删除文章
  //  */
  // static async delete (ctx) {
  //     ctx.body = ctx.util.resuccess()
  // }
}

export default ArticleControllers
