const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userroute");
const postRoutes = require("./routes/postroute");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/post", postRoutes);

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err.message));

app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
