const express = require("express");
const router = express.Router();
const { Patient, Doctor } = require("../models");

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [{ model: Doctor, as: "doctor" }],
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat pasien" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id, {
      include: [{ model: Doctor, as: "doctor" }],
    });
    if (patient) res.json(patient);
    else res.status(404).json({ message: "Data not found" });
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Patient.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const patient = await Patient.findByPk(req.params.id);
      res.json(patient);
    } else {
      res.status(404).json({ message: "Pasien not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Patient.destroy({ where: { id: req.params.id } });
    if (deleted) res.status(204).send();
    else res.status(404).json({ message: "Pasien not found" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus pasien" });
  }
});

module.exports = router;
