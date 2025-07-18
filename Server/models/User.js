import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

class User extends Model {}

User.init(
	{
		User_Id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		User_Name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "User",
		tableName: "Users",
		timestamps: false,
	}
);

export default User;
