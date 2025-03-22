import { Router } from "express";
import authService from "../services/auth.service.js";
import handleResponse from "../utils/response-handler.utils.js";

const router = Router();

router.post("/register", async (req, res) => {
   const result = await authService.registerAccount(req.body);
   handleResponse(res, result);
});

export default router;
