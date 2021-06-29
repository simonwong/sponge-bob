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
      isEmail: true,
    },
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 10],
    },
  },
  password: {
    type: DataTypes.STRING,
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
