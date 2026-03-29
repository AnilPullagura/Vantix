import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import { HfInference } from "@huggingface/inference";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pear Media Backend is running!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
