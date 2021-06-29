import config from 'config'
import { Sequelize } from 'sequelize'

const { host, port, dbName, user, password } = config.get('dbConfig')

export const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.log('Unable to connect to the database.', err)
    process.exit(1)
  })
