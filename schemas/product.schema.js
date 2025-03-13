import MONGOOSE from "mongoose";

const productSchema = new MONGOOSE.Schema(
   {
      Name: { type: String, required: true, unique: true },
      Description: { type: String, required: true, default: "No description" },
      Price: { type: Number, required: true, min: 0 },
      URLimg: { type: String, default: "No image" },
      IsDeleted: { type: Boolean, default: false },
   },
   { timestamps: true }
);
export default MONGOOSE.model("Product", productSchema);
