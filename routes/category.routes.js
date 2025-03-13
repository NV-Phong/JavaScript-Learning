import { Router } from "express";
import categoryService from "../services/category.service.js";
import handleResponse from "../utils/response-handler.utils.js";

const router = Router();

// Routes
router.get("/", async (req, res) => {
   const result = await categoryService.getAllCategories();
   handleResponse(res, result);
});

router.get("/:id", async (req, res) => {
   const result = await categoryService.getCategoryById(req.params.id);
   handleResponse(res, result);
});

router.post("/", async (req, res) => {
   const result = await categoryService.createCategory(req.body);
   handleResponse(res, result);
});

router.put("/:id", async (req, res) => {
   const result = await categoryService.updateCategory(req.params.id, req.body);
   handleResponse(res, result);
});

router.delete("/:id", async (req, res) => {
   const result = await categoryService.softDeleteCategory(req.params.id);
   handleResponse(res, result);
});

export default router;
