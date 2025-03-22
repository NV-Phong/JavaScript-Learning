import { Router } from "express";
import userService from "../services/user.service.js";
import handleResponse from "../utils/response-handler.utils.js";
import authMiddleware from "../middleware/auth.middleware.js"; // Import the middleware

const router = Router();

// Apply the middleware to all routes
// router.use(authMiddleware.verifyToken);

// Routes
//TODO : get all, getbyid (trừ id của chính user): mod
router.get("/", async (req, res) => {
   const { username, fullName, minLoginCount, maxLoginCount } = req.query;
   const result = await userService.getAllUsers({
      username,
      fullName,
      minLoginCount,
      maxLoginCount,
   });
   handleResponse(res, result);
});

router.get("/:id", async (req, res) => {
   const result = await userService.getUserById(req.params.id);
   handleResponse(res, result);
});

router.post(
   "/",
   authMiddleware.verifyToken,
   authMiddleware.verifyRole(["ADMIN"]),
   async (req, res) => {
      const result = await userService.createUser(req.body);
      handleResponse(res, result);
   }
);

router.post("/activate", async (req, res) => {
   const { Email, Username } = req.body;
   const result = await userService.activateUser({ Email, Username });
   handleResponse(res, result);
});

router.put(
   "/:id",
   authMiddleware.verifyToken,
   authMiddleware.verifyRole(["ADMIN"]),
   async (req, res) => {
      const result = await userService.updateUser(req.params.id, req.body);
      handleResponse(res, result);
   }
);

router.delete(
   "/:id",
   authMiddleware.verifyToken,
   authMiddleware.verifyRole(["ADMIN"]),
   async (req, res) => {
      const result = await userService.softDeleteUser(req.params.id);
      handleResponse(res, result);
   }
);

router.get("/me", authMiddleware.verifyToken, async (req, res) => {
   const result = await authService.getCurrentUser(req.user.id);
   handleResponse(res, result);
});

router.put("/changepassword", authMiddleware.verifyToken, async (req, res) => {
   const result = await authService.changePassword(req.user.id, req.body);
   handleResponse(res, result);
});

export default router;
