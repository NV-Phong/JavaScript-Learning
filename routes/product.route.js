// routes/product.routes.js
import { Router } from "express";
import productService from "../services/product.service.js";
import handleResponse from "../utils/response-handler.utils.js";

const router = Router();

// Routes
router.get("/", async (req, res) => {
  const { categoryId } = req.query; // Optional category filter
  const result = await productService.getAllProducts(categoryId);
  handleResponse(res, result);
});

router.get("/:id", async (req, res) => {
  const result = await productService.getProductById(req.params.id);
  handleResponse(res, result);
});

router.post("/", async (req, res) => {
  const result = await productService.createProduct(req.body); // Category as ObjectId in req.body
  handleResponse(res, result);
});

router.put("/:id", async (req, res) => {
  const result = await productService.updateProduct(req.params.id, req.body);
  handleResponse(res, result);
});

router.delete("/:id", async (req, res) => {
  const result = await productService.softDeleteProduct(req.params.id);
  handleResponse(res, result);
});

export default router;