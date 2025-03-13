// services/product.service.js
import Product from "../schemas/product.schema.js";

// GET: Fetch all products (excluding soft-deleted ones), optionally filter by category
const getAllProducts = async (categoryId = null) => {
  try {
    const query = { IsDeleted: false };
    if (categoryId) {
      query.Category = categoryId; // Filter by category ID
    }
    const products = await Product.find(query).populate("Category"); // Populate category details
    return { success: true, data: products };
  } catch (error) {
    return { success: false, message: "Error fetching products", error };
  }
};

// GET: Fetch a product by ID (excluding soft-deleted ones)
const getProductById = async (id) => {
  try {
    const product = await Product.findOne({ _id: id, IsDeleted: false }).populate("Category");
    if (!product) {
      return { success: false, message: "Product not found", status: 404 };
    }
    return { success: true, data: product };
  } catch (error) {
    return { success: false, message: "Error fetching product", error, status: 500 };
  }
};

// POST: Create a new product
const createProduct = async (productData) => {
  try {
    const newProduct = new Product(productData); // Category is an ObjectId in productData
    await newProduct.save();
    const populatedProduct = await Product.findById(newProduct._id).populate("Category");
    return { success: true, data: populatedProduct, status: 201 };
  } catch (error) {
    return { success: false, message: "Error creating product", error, status: 400 };
  }
};

// PUT: Update a product by ID
const updateProduct = async (id, updateData) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      updateData, // Category can be updated with a new ObjectId
      { new: true }
    ).populate("Category");
    if (!updatedProduct) {
      return { success: false, message: "Product not found", status: 404 };
    }
    return { success: true, data: updatedProduct };
  } catch (error) {
    return { success: false, message: "Error updating product", error, status: 400 };
  }
};

// DELETE: Soft delete a product by ID
const softDeleteProduct = async (id) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      { IsDeleted: true },
      { new: true }
    );
    if (!product) {
      return { success: false, message: "Category not found", status: 404 };
    }
    return { success: true, message: "Product deleted (soft)" };
  } catch (error) {
    return { success: false, message: "Error deleting product", error, status: 500 };
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
};