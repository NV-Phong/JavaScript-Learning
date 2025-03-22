import User from "../schemas/user.schema.js";
import Role from "../schemas/role.schema.js";

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

export default {
   registerAccount,
};
