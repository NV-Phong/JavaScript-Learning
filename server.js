import dotenv from "dotenv";
import express from "express";
import MONGOOSE from "mongoose";
import configureRoutes from "./config/router.config.js";

dotenv.config({ path: ".env.development" });
const APP = express();
APP.use(express.json());

//--------------------------------------------------CONFIG--------------------------------------------------//

configureRoutes(APP);

// Connect to MongoDB
MONGOOSE.connect(process.env.MONGODB_URL).catch((error) => {
   console.error("MongoDB connection error:", error);
   process.exit(1);
});
MONGOOSE.connection.on("connected", () => console.log("Connected to MongoDB"));

// Start Server
APP.listen(process.env.PORT, process.env.HOST, () => {
   console.log(
      `🚀 Server is running on http://${process.env.HOST}:${process.env.PORT} 🚀`
   );
});
