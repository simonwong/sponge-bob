import { Model, DataTypes, Optional } from 'sequelize'
import { User } from './user'
import { sequelize } from '.'

export interface ArticleAttributes {
  id: string
  title: string
  content: string
  userId?: string
}

export type ArticleCreationAttributes = Optional<ArticleAttributes, 'id'>

interface ArticleInstance
  extends Model<ArticleAttributes, ArticleCreationAttributes>,
    ArticleAttributes {}

export const Article = sequelize.define<ArticleInstance>('article', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: '请输入文章标题',
      },
      len: {
        args: [3, 25],
        msg: '文章标题限制 3 - 25 个字符',
      },
    },
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: '请输入文章内容',
      },
      len: {
        args: [10, 255],
        msg: '文章内容限制 10 - 255 个字符',
      },
    },
  },
})
;(async () => {
  Article.belongsTo(User)
  await Article.sync()
})()
