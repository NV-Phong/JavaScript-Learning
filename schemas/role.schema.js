import MONGOOSE from "mongoose";

const roleSchema = new MONGOOSE.Schema(
   {
      RoleName: { type: String, required: true, unique: true },
      Description: { type: String, default: "" },
      IsDeleted: { type: Boolean, default: false },
   },
   { timestamps: true }
);

export default MONGOOSE.model("Role", roleSchema);
