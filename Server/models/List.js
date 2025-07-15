import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

class List extends Model {}

List.init(
	{
		List_Id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		List_Name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		User_Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "List",
		tableName: "Lists",
		timestamps: false,
	}
);

export default List;
