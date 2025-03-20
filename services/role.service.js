import Role from "../schemas/role.schema.js";

// GET: Fetch all roles (excluding soft-deleted ones)
const getAllRoles = async () => {
  try {
    const roles = await Role.find({ IsDeleted: false });
    return { success: true, data: roles };
  } catch (error) {
    return { success: false, message: "Error fetching roles", error };
  }
};

// GET: Fetch a role by ID (excluding soft-deleted ones)
const getRoleById = async (id) => {
  try {
    const role = await Role.findOne({ _id: id, IsDeleted: false });
    if (!role) {
      return { success: false, message: "Role not found", status: 404 };
    }
    return { success: true, data: role };
  } catch (error) {
    return { success: false, message: "Error fetching role", error, status: 500 };
  }
};

// POST: Create a new role
const createRole = async (roleData) => {
  try {
    const newRole = new Role(roleData);
    await newRole.save();
    return { success: true, data: newRole, status: 201 };
  } catch (error) {
    return { success: false, message: "Error creating role", error, status: 400 };
  }
};

// PUT: Update a role by ID
const updateRole = async (id, updateData) => {
  try {
    const updatedRole = await Role.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      updateData,
      { new: true }
    );
    if (!updatedRole) {
      return { success: false, message: "Role not found", status: 404 };
    }
    return { success: true, data: updatedRole };
  } catch (error) {
    return { success: false, message: "Error updating role", error, status: 400 };
  }
};

// DELETE: Soft delete a role by ID
const softDeleteRole = async (id) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      { IsDeleted: true },
      { new: true }
    );
    if (!role) {
      return { success: false, message: "Role not found", status: 404 };
    }
    return { success: true, message: "Role deleted (soft)" };
  } catch (error) {
    return { success: false, message: "Error deleting role", error, status: 500 };
  }
};

export default {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  softDeleteRole,
};