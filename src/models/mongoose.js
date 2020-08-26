import { dbConfig } from 'config'
import { Sequelize } from 'sequelize'

const { host, port, dbName } = dbConfig

try {
  const sequelize = new Sequelize(dbName, 'u', 'p', {
    dialect: 'mysql',
    host,
    port,
  })
} catch (err) {
  console.error('connect to %s error: ', dbName, err.message)
  process.exit(1)
}
