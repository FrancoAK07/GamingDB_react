import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import routes from "./routes/index.js";
import sequelize from "./models/index.js";

config();
const app = express();

app.listen(3001, () => {
	console.log(`running on port 3001`);
});

app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(
	cors({
		origin: ["http://localhost:3000", "https://gaming-db-react-front.vercel.app"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json({ limit: "5mb" }));
app.use("/", routes); // Add this line to use routes

console.log(sequelize);

// Test the connection
sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

app.get("/test", async (req, res) => {
	res.json("this is a test from my server");
});
