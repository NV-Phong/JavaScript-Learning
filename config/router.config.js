import productRoutes from "../routes/product.route.js";
import categoryRoutes from "../routes/category.route.js";
import rolesRoutes from "../routes/role.route.js";
import usersRoutes from "../routes/user.route.js";
import authRoutes from "../routes/auth.route.js";

const configureRoutes = (app) => {
   app.use("/products", productRoutes);
   app.use("/categories", categoryRoutes);
   app.use("/roles", rolesRoutes);
   app.use("/users", usersRoutes);
   app.use("/auth", authRoutes);
};

export default configureRoutes;
