import { Router } from "express";
import userService from "../services/user.service.js";
import handleResponse from "../utils/response-handler.utils.js";

const router = Router();

// Routes
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

router.post("/", async (req, res) => {
   const result = await userService.createUser(req.body);
   handleResponse(res, result);
});

router.post("/activate", async (req, res) => {
   const { Email, Username } = req.body;
   const result = await userService.activateUser({ Email, Username });
   handleResponse(res, result);
});

router.put("/:id", async (req, res) => {
   const result = await userService.updateUser(req.params.id, req.body);
   handleResponse(res, result);
});

router.delete("/:id", async (req, res) => {
   const result = await userService.softDeleteUser(req.params.id);
   handleResponse(res, result);
});

export default router;
