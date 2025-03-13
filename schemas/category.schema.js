// schemas/category.schema.js
import MONGOOSE from "mongoose";

const categorySchema = new MONGOOSE.Schema(
   {
      Name: { type: String, required: true, unique: true },
      Description: { type: String, default: "No description" },
      IsDeleted: { type: Boolean, default: false },
   },
   { timestamps: true }
);

export default MONGOOSE.model("Category", categorySchema);
