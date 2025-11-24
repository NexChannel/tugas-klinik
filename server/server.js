const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const doctorRoutes = require("./routes/doctorroute");
const patientRoutes = require("./routes/patientroute");
const prescriptionRoutes = require("./routes/prescriptionroute");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/prescription", prescriptionRoutes);

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err.message));

app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
