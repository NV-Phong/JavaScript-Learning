import { Router } from "express";
import roleService from "../services/role.service.js";
import handleResponse from "../utils/response-handler.utils.js";

const router = Router();

// Routes
router.get("/", async (req, res) => {
  const result = await roleService.getAllRoles();
  handleResponse(res, result);
});

router.get("/:id", async (req, res) => {
  const result = await roleService.getRoleById(req.params.id);
  handleResponse(res, result);
});

router.post("/", async (req, res) => {
  const result = await roleService.createRole(req.body);
  handleResponse(res, result);
});

router.put("/:id", async (req, res) => {
  const result = await roleService.updateRole(req.params.id, req.body);
  handleResponse(res, result);
});

router.delete("/:id", async (req, res) => {
  const result = await roleService.softDeleteRole(req.params.id);
  handleResponse(res, result);
});

export default router;