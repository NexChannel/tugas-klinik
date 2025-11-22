const express = require("express");
const route = express.Router();
const { Doctor, Patient } = require("../models");

route.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [
        {
          model: Patient,
          as: "patients",
        },
      ],
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat dokter" });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id, {
      include: [
        {
          model: Patient,
          as: "patients",
        },
      ],
    });
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan data" });
  }
});

route.post("/", async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const [updated] = await Doctor.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const doctor = await Doctor.findByPk(req.params.id);
      res.json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const deleted = await Doctor.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus dokter" });
  }
});

module.exports = route;
