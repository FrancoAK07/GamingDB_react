import { config } from "dotenv";
config();

const sequelizeConfig = {
	HOST: process.env.DB_HOST,
	PORT: process.env.PORT,
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASSWORD,
	DB: process.env.DB_DATABASE,
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 80000,
		idle: 10000,
	},
	dialectOptions: {
		ssl: {
			ca: process.env.DB_CA,
			rejectUnauthorized: false,
		},
		connectTimeout: 60000,
	},
};

export default sequelizeConfig;
