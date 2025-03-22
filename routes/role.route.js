import { Router } from "express";
import roleService from "../services/role.service.js";
import handleResponse from "../utils/response-handler.utils.js";
import authMiddleware from "../middleware/auth.middleware.js";

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

router.post(
   "/",
   authMiddleware.verifyToken,
   authMiddleware.verifyRole(["ADMIN"]),
   async (req, res) => {
      const result = await roleService.createRole(req.body);
      handleResponse(res, result);
   }
);

router.put(
   "/:id",
   authMiddleware.verifyToken,
   authMiddleware.verifyRole(["ADMIN"]),
   async (req, res) => {
      const result = await roleService.updateRole(req.params.id, req.body);
      handleResponse(res, result);
   }
);

router.delete(
   "/:id",
   authMiddleware.verifyToken,
   authMiddleware.verifyRole(["ADMIN"]),
   async (req, res) => {
      const result = await roleService.softDeleteRole(req.params.id);
      handleResponse(res, result);
   }
);

router.get("/me", middleware.verifyToken, async (req, res) => {
   const result = await authService.getCurrentUser(req.user.id);
   handleResponse(res, result);
});

router.put("/changepassword", middleware.verifyToken, async (req, res) => {
   const result = await authService.changePassword(req.user.id, req.body);
   handleResponse(res, result);
});

export default router;
