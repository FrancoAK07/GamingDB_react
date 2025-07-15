import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

class Review extends Model {}

Review.init(
	{
		Review_ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Game_Review: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		Game_Rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		Platform: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		User: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		Game_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		User_Id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Review",
		tableName: "Reviews",
		timestamps: false,
	}
);

export default Review;
