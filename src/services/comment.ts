import { Comment, CommentCreationAttributes } from '../models/comment'
import { User } from '../models/user'
import { attributesExclude } from './user'

export class CommentService {
  static async findAllByCommentId(articleId: string) {
    const comments = await Comment.findAll({
      where: { articleId },
      attributes: { exclude: ['articleId'] },
      include: {
        model: User,
        attributes: { exclude: attributesExclude },
      },
    })
    return comments
  }

  static async create(data: CommentCreationAttributes) {
    const article = await Comment.create(data)
    return article
  }
}
