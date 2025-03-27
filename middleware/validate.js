import { validationResult } from "express-validator";
import handleResponse from "../utils/response-handler.utils.js";

const validate = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return handleResponse(res, {
         success: false,
         message: errors.array()[0].msg,
         status: 400,
      });
   }
   next();
};

export default validate;
