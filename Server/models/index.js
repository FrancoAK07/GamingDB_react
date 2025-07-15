import sequelizeConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(sequelizeConfig.DB, sequelizeConfig.USER, sequelizeConfig.PASSWORD, {
	host: sequelizeConfig.HOST,
	dialect: sequelizeConfig.dialect,
	pool: {
		max: sequelizeConfig.pool.max,
		min: sequelizeConfig.pool.min,
		acquire: sequelizeConfig.pool.acquire,
		idle: sequelizeConfig.pool.idle,
	},
	dialectOptions: {
		ssl: {
			ca: sequelizeConfig.dialectOptions.ssl.ca,
			rejectUnauthorized: false,
		},
		connectTimeout: 60000,
	},
});

export default sequelize;
