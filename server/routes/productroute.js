const express = require("express");
const router = express.Router();
const { Product, Category } = require("../models");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "category" }],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });
    if (product) res.json(product);
    else res.status(404).json({ message: "Data not found" });
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const product = await Product.findByPk(req.params.id);
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (deleted) res.status(204).send();
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus product" });
  }
});

module.exports = router;
