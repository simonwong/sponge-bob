import * as mongoose from 'mongoose'
import * as moment from 'moment'

/**
 * article 表结构
 */
const articleSchema = new mongoose.Schema({
  title: String, // 标题
  author: String, // 作者
  body: String, // 内容
  type: Number, // 文章大类，前端文章 = 1，生活随笔 = 2
  tags: String, // 所属标签
  createDate: { // 日期
    type: Date,
    default: Date.now,
    get: (v: Date) => moment(v).format('YYYY-MM-DD HH:mm'),
  },
})
articleSchema.set('toJSON', { getters: true })

/**
 * 模型
 */
export default mongoose.model('Article', articleSchema)

// import {
//     Schema, Document, Model, model,
// } from 'mongoose'
// import * as moment from 'moment'

// export interface IArticle extends Document {
//     title: string
//     author: string
//     body: string
//     type: number
//     tags: string
//     date: Date
//     viewCount: number
//     commentCount: number
//     isPublish: boolean
// }

// /**
//  * article 表结构
//  */
// const articleSchema = new Schema({
//     title: String, // 标题
//     author: String, // 作者
//     body: String, // 内容
//     type: Number, // 文章大类，前端文章 = 1，生活随笔 = 2
//     tags: String, // 所属标签
//     date: { // 日期
//         type: Date,
//         default: Date.now,
//         get: (v: Date) => moment(v).format('YYYY-MM-DD HH:mm'),
//     },
//     viewCount: Number, // 浏览量
//     commentCount: Number, // 评论量
//     isPublish: Boolean, // 是否发布
// })
// articleSchema.set('toJSON', { getters: true })

// /**
//  * 模型
//  */
// const ArticleModel: Model<IArticle> = model<IArticle>('Article', articleSchema)

// export default ArticleModel
