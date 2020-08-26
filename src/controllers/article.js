import ArticleProxy from '../proxy/article'

class ArticleControllers {
  /**
   * 获取文章列表
   */
  static async list(ctx) {
    const articles = await ArticleProxy.find(ctx.params)
    ctx.body = ctx.util.resuccess({
      list: articles,
    })
  }
}

export default ArticleControllers
