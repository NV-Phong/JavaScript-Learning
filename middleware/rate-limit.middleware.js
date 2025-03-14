import rateLimit from "express-rate-limit";

export default function rateLimitMiddleware(app) {
   const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // 100 requests per windowMs
      message:
         "Too many requests from this IP, please try again after 15 minutes",
   });
   app.use(limiter);
}
