import MONGOOSE from "mongoose";

const connectDB = async () => {
   try {
      await MONGOOSE.connect(process.env.MONGODB_URL);
      MONGOOSE.connection.on("connected", () =>
         console.log("Connected to MongoDB")
      );
   } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
   }
};

export default connectDB;
