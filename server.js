import dotenv from "dotenv";
import express from "express";
import productRoutes from "./routes/product.route.js";
import MONGOOSE from "mongoose";

dotenv.config({ path: ".env.development" });
const APP = express();

//--------------------------------------------------CONFIG--------------------------------------------------//

APP.use("/api/products", productRoutes);

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
