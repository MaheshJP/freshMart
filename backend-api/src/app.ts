import express from "express";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.router";

const app = express(); 

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;