import productRoutes from "../routes/product.route.js";
import categoryRoutes from "../routes/category.route.js";

const configureRoutes = (app) => {
   app.use("/products", productRoutes);
   app.use("/categories", categoryRoutes);
};

export default configureRoutes;
