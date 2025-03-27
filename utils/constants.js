export const STATUS_CODES = {
   OK: 200,
   BAD_REQUEST: 400,
   UNAUTHORIZED: 401,
};

export const VALIDATION_MESSAGES = {
   USERNAME_ALPHANUMERIC: "Username must be alphanumeric",
   USERNAME_LENGTH: "Username must be between 3-30 characters",
   EMAIL_INVALID: "Invalid email format",
   PASSWORD_LENGTH: "Password must be at least 8 characters",
   PASSWORD_COMPLEXITY:
      "Password must contain at least one lowercase letter, one uppercase letter, and one number",
   PASSWORD_REQUIRED: "Password is required",
};

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 30;
export const MIN_PASSWORD_LENGTH = 8;
