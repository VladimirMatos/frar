import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { dbHost, dbName, dbPass, dbPort, dbUser } = process.env;

const db = new Sequelize({
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  timezone: '-04:00',
  host: dbHost,
  username: dbUser,
  password: dbPass,
  port: Number(dbPort) || 3306,
  database: dbName,
  pool: {
    max: 100,
    acquire: 30000,
  },
  logging: false,
});

db.sync();

export default db;
