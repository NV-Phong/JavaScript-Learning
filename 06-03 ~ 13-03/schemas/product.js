import MONGOOSE from "mongoose";

const productSchema = new MONGOOSE.Schema({
   Name: { type: String, required: true, unique: true },
   Desciption: { type: String, required: true, default: "No description" },
   Price: { type: Number, required: true, min: 0 },
   IsDeleted: { type: Boolean, default: false },
});
