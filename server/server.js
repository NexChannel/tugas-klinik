const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const categoryRoutes = require("./routes/categoryroute");
const productRoutes = require("./routes/productroute");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err.message));

app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
