import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
   try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
         return res.status(401).json({
            success: false,
            message: "Unauthorize",
         });
      }

      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET || "your-secret-key"
      );
      req.user = decoded;
      next();
   } catch (error) {
      return res.status(401).json({
         success: false,
         message: "Token không hợp lệ",
         error: error.message,
      });
   }
};

const verifyRole = (roles) => (req, res, next) => {
   if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
         success: false,
         message: "Forbidden: Bạn không có quyền truy cập",
      });
   }
   next();
};

export default {
   verifyToken,
   verifyRole,
};
