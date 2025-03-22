import User from "../schemas/user.schema.js";
import Role from "../schemas/role.schema.js";
import { generateAccessToken } from "../utils/jwt.utils.js";

const registerAccount = async (userData) => {
   try {
      // Kiểm tra nếu userData không có Role thì gán mặc định
      if (!userData.Role) {
         const userRole = await Role.findOne({ RoleName: "USER" }); // Tìm role "USER"
         if (!userRole) {
            return {
               success: false,
               message: "Role USER không tồn tại",
               status: 400,
            };
         }
         userData.Role = userRole._id; // Gán Role mặc định
      }

      const newUser = new User(userData);
      await newUser.save();
      const populatedUser = await User.findById(newUser._id).populate("Role");
      return { success: true, data: populatedUser, status: 201 };
   } catch (error) {
      return {
         success: false,
         message: "Error creating user",
         error,
         status: 400,
      };
   }
};

const login = async (loginData) => {
   try {
      const { Email, Password } = loginData;

      if (!Email || !Password) {
         throw new Error("Email và mật khẩu là bắt buộc");
      }

      const user = await User.findOne({ Email }).populate("Role");
      if (!user) {
         throw new Error("Email không tồn tại");
      }

      if (!user.Role || !user.Role.RoleName) {
         throw new Error("User role is invalid or missing RoleName");
      }

      const isMatch = await user.comparePassword(Password);
      if (!isMatch) {
         throw new Error("Mật khẩu không đúng");
      }

      const token = generateAccessToken(user);
      return { access_token: token }; // Only return the token
   } catch (error) {
      throw new Error(error.message || "Error during login");
   }
};

const getCurrentUser = async (userId) => {
   try {
      const user = await User.findById(userId).populate("Role");
      if (!user) {
         return {
            success: false,
            message: "Không tìm thấy người dùng",
            status: 404,
         };
      }
      return { success: true, data: user, status: 200 };
   } catch (error) {
      return {
         success: false,
         message: "Lỗi khi lấy thông tin người dùng",
         status: 500,
      };
   }
};

const changePassword = async (userId, passwordData) => {
   try {
      const { currentPassword, newPassword } = passwordData;

      if (!currentPassword || !newPassword) {
         return {
            success: false,
            message: "Mật khẩu hiện tại và mật khẩu mới là bắt buộc",
            status: 400,
         };
      }

      const user = await User.findById(userId);
      if (!user) {
         return {
            success: false,
            message: "Không tìm thấy người dùng",
            status: 404,
         };
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
         return {
            success: false,
            message: "Mật khẩu hiện tại không đúng",
            status: 401,
         };
      }

      user.Password = newPassword; // Giả sử schema có pre-save hook để hash
      await user.save();

      return {
         success: true,
         message: "Đổi mật khẩu thành công",
         status: 200,
      };
   } catch (error) {
      return {
         success: false,
         message: "Lỗi khi đổi mật khẩu",
         status: 500,
      };
   }
};

export default {
   registerAccount,
   login,
   getCurrentUser,
   changePassword
};
