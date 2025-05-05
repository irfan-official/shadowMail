import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import mailRoute from "./routes/mail.route.js";
import mongooseConnection from "./connections/mongoose.connnect.js";
import authRoute from "../src/routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/mail", mailRoute);
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome Irfan to shadowMail</h1>");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  mongooseConnection();
  console.log(`Server running on port ${port}`);
});
