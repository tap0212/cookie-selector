import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'clicker_game',
  logging: false,
  retry: {
    max: 5,
    backoffBase: 1000,
    backoffExponent: 1.5,
  }
});

export default sequelize; 