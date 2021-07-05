import { Model, DataTypes, Optional } from 'sequelize'
import { sequelize } from '.'

interface UserAttributes {
  id: string
  userName: string
  email: string
  password: string
  token: string
}

export type UserCreationAttributes = Optional<
  Optional<UserAttributes, 'token'>,
  'id'
>

export type UserLoginAttributes = Optional<UserCreationAttributes, 'userName'>

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const User = sequelize.define<UserInstance>('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: '邮箱格式错误',
      },
    },
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: '请输入用户名',
      },
      len: {
        args: [2, 10],
        msg: '用户名长度限制 2 - 10 个字符',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notNull: {
        msg: '请输入密码',
      },
    },
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
})
// ;(async () => {
//   await User.sync()
// })()

// async function doStuff() {
//   const instance = await User.findByPk(1, {
//     rejectOnEmpty: true,
//   })
//   console.log(instance.id)
// }
