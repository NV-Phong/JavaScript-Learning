import { Router } from "express";
import authService from "../services/auth.service.js";
import handleResponse from "../utils/response-handler.utils.js";
import validate from "../middleware/validate.js";
import {
   registerValidation,
   loginValidation,
} from "../utils/validators/auth.validator.js";
import { STATUS_CODES } from "../utils/constants.js";

const router = Router();

router.post(
   "/register",
   [...registerValidation, validate],
   async (req, res) => {
      const result = await authService.registerAccount(req.body);
      handleResponse(res, result);
   }
);

router.post("/login", [...loginValidation, validate], async (req, res) => {
   try {
      const result = await authService.login(req.body);
      handleResponse(res, {
         success: true,
         data: result,
         status: STATUS_CODES.OK,
      });
   } catch (error) {
      handleResponse(res, {
         success: false,
         message: error.message,
         status: STATUS_CODES.UNAUTHORIZED,
      });
   }
});

export default router;
