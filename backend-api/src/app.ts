import express from "express";
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(express.json());
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;