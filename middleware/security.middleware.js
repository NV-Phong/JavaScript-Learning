import helmet from "helmet";
import cors from "cors";

export default function securityMiddleware(app) {
   app.use(helmet());

   app.use(
      cors({
         origin: (origin, callback) => {
            if (
               !origin ||
               origin.startsWith(process.env.ALLOWED_ORIGIN_PREFIX)
            ) {
               callback(null, true);
            } else {
               callback(new Error("Not allowed by CORS"));
            }
         },
         allowedHeaders: ["Content-Type", "Authorization"],
         credentials: true,
      })
   );
}
