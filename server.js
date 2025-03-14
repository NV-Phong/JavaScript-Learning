import dotenv from "dotenv";
import express from "express";
import configureRoutes from "./config/router.config.js";
import connectDB from "./config/database.config.js";
import Middleware from "./middleware/middleware.js";

//--------------------------------------------------CONFIG--------------------------------------------------//

dotenv.config({ path: ".env.development" });
const APP = express();

// Integrate Middleware, Routes and Database
Middleware(APP);
connectDB();
configureRoutes(APP);

// Start Server
APP.listen(process.env.PORT, process.env.HOST, () => {
   console.log(
      `🚀 Server is running on http://${process.env.HOST}:${process.env.PORT} 🚀`
   );
});
