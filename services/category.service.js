import Category from "../schemas/category.schema.js";

// GET: Fetch all categories (excluding soft-deleted ones)
const getAllCategories = async () => {
   try {
      const categories = await Category.find({ IsDeleted: false });
      return { success: true, data: categories };
   } catch (error) {
      return { success: false, message: "Error fetching categories", error };
   }
};

// GET: Fetch a category by ID
const getCategoryById = async (id) => {
   try {
      const category = await Category.findOne({ _id: id, IsDeleted: false });
      if (!category) {
         return { success: false, message: "Category not found", status: 404 };
      }
      return { success: true, data: category };
   } catch (error) {
      return {
         success: false,
         message: "Error fetching category",
         error,
         status: 500,
      };
   }
};

// POST: Create a new category
const createCategory = async (categoryData) => {
   try {
      const newCategory = new Category(categoryData);
      await newCategory.save();
      return { success: true, data: newCategory, status: 201 };
   } catch (error) {
      return {
         success: false,
         message: "Error creating category",
         error,
         status: 400,
      };
   }
};

// PUT: Update a category by ID
const updateCategory = async (id, updateData) => {
   try {
      const updatedCategory = await Category.findOneAndUpdate(
         { _id: id, IsDeleted: false },
         updateData,
         { new: true }
      );
      if (!updatedCategory) {
         return { success: false, message: "Category not found", status: 404 };
      }
      return { success: true, data: updatedCategory };
   } catch (error) {
      return {
         success: false,
         message: "Error updating category",
         error,
         status: 400,
      };
   }
};

// DELETE: Soft delete a category by ID
const softDeleteCategory = async (id) => {
   try {
      const category = await Category.findOneAndUpdate(
         { _id: id, IsDeleted: false },
         { IsDeleted: true },
         { new: true }
      );
      if (!category) {
         return { success: false, message: "Category not found", status: 404 };
      }
      return { success: true, message: "Category deleted (soft)" };
   } catch (error) {
      return {
         success: false,
         message: "Error deleting category",
         error,
         status: 500,
      };
   }
};

export default {
   getAllCategories,
   getCategoryById,
   createCategory,
   updateCategory,
   softDeleteCategory,
};
