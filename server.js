import dotenv from "dotenv";
import express from "express";
import configureRoutes from "./config/router.config.js";
import connectDB from "./config/database.config.js";

//--------------------------------------------------CONFIG--------------------------------------------------//

dotenv.config({ path: ".env.development" });
const APP = express().use(express.json());

// Attach all defined routes
configureRoutes(APP);

// Connect to MongoDB
connectDB();

// Start Server
APP.listen(process.env.PORT, process.env.HOST, () => {
   console.log(
      `🚀 Server is running on http://${process.env.HOST}:${process.env.PORT} 🚀`
   );
});
