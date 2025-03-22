// In utils/jwt.utils.js
import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
   const payload = {
      username: user.Username,
      sub: user._id,
      email: user.Email,
   };
   return jwt.sign(
      payload,
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d" }
   );
};