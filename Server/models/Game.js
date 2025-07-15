import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

class Game extends Model {}

Game.init(
	{
		Game_ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Game_Title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Game_Img: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		Game_Background: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Game",
		tableName: "Games",
		timestamps: false,
	}
);

export default Game;
