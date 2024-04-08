const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'ep-winter-frog-a4tgf88r-pooler.us-east-1.aws.neon.tech',
  port: 5432,
  username: 'default',
  password: 'LZzbEF9UPKN3',
  database: 'verceldb',
  dialectOptions: {
    ssl: {
       require: true
    }
  },
});

module.exports = sequelize;