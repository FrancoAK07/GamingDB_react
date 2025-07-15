import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

class Comment extends Model {}

Comment.init(
	{
		Comment_Id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Comment_Text: {
			type: DataTypes.TEXT,
			allowNull: false,
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
		modelName: "Comment",
		tableName: "Comments",
		timestamps: false,
	}
);

export default Comment;
