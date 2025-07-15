import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

class Like extends Model {}

Like.init(
	{
		Like_Id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		User_Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		Review_Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Like",
		tableName: "Likes",
		timestamps: false,
	}
);

export default Like;
