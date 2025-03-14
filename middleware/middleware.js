import express from "express";
import securityMiddleware from "./security.middleware.js";
import loggingMiddleware from "./logging.middleware.js";
import rateLimitMiddleware from "./rate-limit.middleware.js";

export default function Middleware(APP) {
   APP.use(express.json());
   securityMiddleware(APP);
   loggingMiddleware(APP);
   rateLimitMiddleware(APP);
}
