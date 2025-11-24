const express = require("express");
const router = express.Router();
const { Prescription, Doctor } = require("../models");

// GET all prescriptions
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({
      include: [{ model: Doctor, as: "doctor" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(prescriptions);
  } catch (err) {
    console.error("GET /prescription error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET single
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id, {
      include: [{ model: Doctor, as: "doctor" }],
    });
    if (!prescription)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(prescription);
  } catch (err) {
    console.error("GET /prescription/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const prescription = await Prescription.create(data);
    res.status(201).json(prescription);
  } catch (err) {
    console.error("POST /prescription error:", err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Prescription.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    const prescription = await Prescription.findByPk(req.params.id);
    res.json(prescription);
  } catch (err) {
    console.error("PUT /prescription/:id error:", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Prescription.destroy({
      where: { id: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /prescription/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
