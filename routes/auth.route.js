import { Router } from "express";
import authService from "../services/auth.service.js";
import handleResponse from "../utils/response-handler.utils.js";

const router = Router();

router.post("/register", async (req, res) => {
   const result = await authService.registerAccount(req.body);
   handleResponse(res, result);
});

router.post("/login", async (req, res) => {
   try {
      const result = await authService.login(req.body);
      handleResponse(res, { success: true, data: result, status: 200 });
   } catch (error) {
      handleResponse(res, { success: false, message: error.message, status: 401 });
   }
});

export default router;
