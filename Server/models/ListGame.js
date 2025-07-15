import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

class ListGame extends Model {}

ListGame.init(
	{
		ListGameId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		List_Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		Game_Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "ListGame",
		tableName: "ListGames",
		timestamps: false,
	}
);

export default ListGame;
