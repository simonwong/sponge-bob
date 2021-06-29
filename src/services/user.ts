import { User, UserCreationAttributes } from '../models/user'

const attributesExclude = ['password', 'token']

export class UserService {
  static async findAll() {
    const users = await User.findAll({
      attributes: { exclude: attributesExclude },
    })
    return users
  }

  static async findByUserId(id: string) {
    const user = await User.findByPk(id, {
      attributes: { exclude: attributesExclude },
    })
    return user
  }

  static async findByEmail(email: string) {
    const users = await User.findOne({ where: { email } })
    return users
  }

  static async updateUserToken(id: string, token: string) {
    const users = await User.update(
      { token },
      {
        where: {
          id,
        },
      },
    )
    return users
  }

  static async create(data: UserCreationAttributes) {
    const users = await User.create(data)
    return users
  }
}
