import User from "../schemas/user.schema.js";
import Role from "../schemas/role.schema.js";

// GET: Fetch all users with filters (excluding soft-deleted ones)
const getAllUsers = async (queryParams = {}) => {
   try {
      const { username, fullName, minLoginCount, maxLoginCount } = queryParams;
      const query = { IsDeleted: false };

      if (username) {
         query.Username = { $regex: username, $options: "i" }; // Case-insensitive contains
      }
      if (fullName) {
         query.FullName = { $regex: fullName, $options: "i" }; // Case-insensitive contains
      }
      if (minLoginCount) {
         query.LoginCount = {
            ...query.LoginCount,
            $gte: Number(minLoginCount),
         };
      }
      if (maxLoginCount) {
         query.LoginCount = {
            ...query.LoginCount,
            $lte: Number(maxLoginCount),
         };
      }

      const users = await User.find(query).populate("Role");
      return { success: true, data: users };
   } catch (error) {
      return { success: false, message: "Error fetching users", error };
   }
};

// GET: Fetch a user by ID (excluding soft-deleted ones)
const getUserById = async (id) => {
   try {
      const user = await User.findOne({ _id: id, IsDeleted: false }).populate(
         "Role"
      );
      if (!user) {
         return { success: false, message: "User not found", status: 404 };
      }
      return { success: true, data: user };
   } catch (error) {
      return {
         success: false,
         message: "Error fetching user",
         error,
         status: 500,
      };
   }
};

// POST: Create a new user
const createUser = async (userData) => {
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

// POST: Activate user status by email and username
const activateUser = async ({ Email, Username }) => {
   try {
      const user = await User.findOne({
         Email: Email,
         Username: Username,
         IsDeleted: false,
      });

      if (!user) {
         return { success: false, message: "User not found", status: 404 };
      }

      user.Status = true;
      await user.save();
      const populatedUser = await User.findById(user._id).populate("Role");
      return { success: true, data: populatedUser, message: "User activated" };
   } catch (error) {
      return {
         success: false,
         message: "Error activating user",
         error,
         status: 400,
      };
   }
};

// PUT: Update a user by ID
const updateUser = async (id, updateData) => {
   try {
      const updatedUser = await User.findOneAndUpdate(
         { _id: id, IsDeleted: false },
         updateData,
         { new: true }
      ).populate("Role");
      if (!updatedUser) {
         return { success: false, message: "User not found", status: 404 };
      }
      return { success: true, data: updatedUser };
   } catch (error) {
      return {
         success: false,
         message: "Error updating user",
         error,
         status: 400,
      };
   }
};

// DELETE: Soft delete a user by ID
const softDeleteUser = async (id) => {
   try {
      const user = await User.findOneAndUpdate(
         { _id: id, IsDeleted: false },
         { IsDeleted: true },
         { new: true }
      );
      if (!user) {
         return { success: false, message: "User not found", status: 404 };
      }
      return { success: true, message: "User deleted (soft)" };
   } catch (error) {
      return {
         success: false,
         message: "Error deleting user",
         error,
         status: 500,
      };
   }
};

export default {
   getAllUsers,
   getUserById,
   createUser,
   activateUser,
   updateUser,
   softDeleteUser,
};
