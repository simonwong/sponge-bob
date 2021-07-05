import { Article, ArticleCreationAttributes } from '../models/article'
import { User } from '../models/user'
import { attributesExclude } from './user'

export class ArticleService {
  static async findAll() {
    const articles = await Article.findAll({
      include: {
        model: User,
        attributes: { exclude: attributesExclude },
      },
    })
    return articles
  }

  static async findAllByUserId(id: string) {
    const articles = await Article.findAll({
      where: { userId: id },
    })
    return articles
  }

  static async findByArticleId(id: string) {
    const article = await Article.findByPk(id)
    return article
  }

  static async updateArticle(id: string, data: ArticleCreationAttributes) {
    const article = await Article.update(data, {
      where: {
        id,
      },
    })
    return article
  }

  static async create(data: ArticleCreationAttributes) {
    const article = await Article.create(data)
    return article
  }
}
