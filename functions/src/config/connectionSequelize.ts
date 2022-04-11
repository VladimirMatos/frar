import { Sequelize } from 'sequelize';
import 'dotenv/config';

const {  
  DBHOST,
  DBUSER,
  DBPASS,
  DBNAME,
  DBPORT } = process.env;

const db = new Sequelize({
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  timezone: '-04:00',
  host: DBHOST,
  username: DBUSER,
  password: DBPASS,
  port: Number(DBPORT) || 3306,
  database: DBNAME,
  pool: {
    max: 100,
    acquire: 30000,
  },
  logging: false,
});

db.sync();

export default db;
