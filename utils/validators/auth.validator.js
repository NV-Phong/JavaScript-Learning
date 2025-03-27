import { body } from "express-validator";
import {
   VALIDATION_MESSAGES,
   MIN_USERNAME_LENGTH,
   MAX_USERNAME_LENGTH,
   MIN_PASSWORD_LENGTH,
} from "../constants.js";

export const registerValidation = [
   body("username")
      .isAlphanumeric()
      .withMessage(VALIDATION_MESSAGES.USERNAME_ALPHANUMERIC)
      .isLength({ min: MIN_USERNAME_LENGTH, max: MAX_USERNAME_LENGTH })
      .withMessage(VALIDATION_MESSAGES.USERNAME_LENGTH),
   body("email")
      .isEmail()
      .withMessage(VALIDATION_MESSAGES.EMAIL_INVALID)
      .normalizeEmail(),
   body("password")
      .isLength({ min: MIN_PASSWORD_LENGTH })
      .withMessage(VALIDATION_MESSAGES.PASSWORD_LENGTH)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
      .withMessage(VALIDATION_MESSAGES.PASSWORD_COMPLEXITY),
];

export const loginValidation = [
   body("email")
      .isEmail()
      .withMessage(VALIDATION_MESSAGES.EMAIL_INVALID)
      .normalizeEmail(),
   body("password")
      .notEmpty()
      .withMessage(VALIDATION_MESSAGES.PASSWORD_REQUIRED),
];
