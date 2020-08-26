import ArticleModel from '../models/article'

class ArticleProxy {
  static async findAll() {
    return await ArticleModel.find()
  }

  static async find(params) {
    return await ArticleModel.find(params)
  }

  // static async addNew (article) {
  //     const data = Object.assign({
  //         viewCount: 0,
  //         commentCount: 0,
  //         isPublish: false,
  //     }, article)
  //     return await (new ArticleModel(data)).save()
  // }
}


export default ArticleProxy
