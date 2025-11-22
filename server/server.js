const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
<<<<<<< HEAD
const doctorRoutes = require("./routes/doctorroute");
const patientRoutes = require("./routes/patientroute");
=======
const userRoutes = require("./routes/userroute");
const postRoutes = require("./routes/postroute");
>>>>>>> 48b80723b2413dd0f6845e55b835b39f4c9ea87d

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
=======
// Simple request logger for debugging (prints method and URL)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);
>>>>>>> 48b80723b2413dd0f6845e55b835b39f4c9ea87d

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err.message));

app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
