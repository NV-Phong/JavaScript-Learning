import Product from "../schemas/product.schema.js";

// GET: Fetch all products (excluding soft-deleted ones)
const getAllProducts = async () => {
  try {
    const products = await Product.find({ IsDeleted: false });
    return { success: true, data: products };
  } catch (error) {
    return { success: false, message: "Error fetching products", error };
  }
};

// GET: Fetch a product by ID (excluding soft-deleted ones)
const getProductById = async (id) => {
  try {
    const product = await Product.findOne({ _id: id, IsDeleted: false });
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
    const newProduct = new Product(productData);
    await newProduct.save();
    return { success: true, data: newProduct, status: 201 };
  } catch (error) {
    return { success: false, message: "Error creating product", error, status: 400 };
  }
};

// PUT: Update a product by ID
const updateProduct = async (id, updateData) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, IsDeleted: false },
      updateData,
      { new: true }
    );
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
      return { success: false, message: "Product not found", status: 404 };
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