import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cors from 'cors'
config();

const app = express();

app
  .use(cors())
  .use(express.json({ limit: "50kb" }))
  .use(express.urlencoded({ extended: true, limit: "50kb" }))
  .use(router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
