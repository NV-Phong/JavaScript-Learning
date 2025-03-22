import MONGOOSE from "mongoose";
import {
   hashPassword,
   comparePasswordMethod,
} from "../utils/security.utils.js";
const userSchema = new MONGOOSE.Schema(
   {
      Username: { type: String, required: true, unique: true },
      Password: { type: String, required: true },
      Email: { type: String, required: true, unique: true },
      FullName: { type: String, default: "" },
      AvatarURL: { type: String, default: "" },
      Status: { type: Boolean, default: false },
      LoginCount: { type: Number, default: 0, min: 0 },
      IsDeleted: { type: Boolean, default: false },
      Role: {
         type: MONGOOSE.Schema.Types.ObjectId,
         ref: "Role",
         required: true,
      },
   },
   { timestamps: true }
);

hashPassword(userSchema);
comparePasswordMethod(userSchema);

export default MONGOOSE.model("User", userSchema);
