import { Model, DataTypes, Optional } from 'sequelize'
import { User } from './user'
import { Article } from './article'
import { sequelize } from '.'

export interface CommentAttributes {
  id: string
  content: string
  articleId?: string
  userId?: string
}

export type CommentCreationAttributes = Optional<CommentAttributes, 'id'>

interface CommentInstance
  extends Model<CommentAttributes, CommentCreationAttributes>,
    CommentAttributes {}

export const Comment = sequelize.define<CommentInstance>('comment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: '请输入评论内容',
      },
      len: {
        args: [1, 255],
        msg: '文章内容限制 1 - 255 个字符',
      },
    },
  },
})
;(async () => {
  Comment.belongsTo(User)
  Comment.belongsTo(Article)
  await Comment.sync()
})()
