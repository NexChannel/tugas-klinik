const express = require("express");
const route = express.Router();
const { User, Post } = require("../models");

route.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Post, as: "posts" }],
    });
    res.json(users);
  } catch (err) {
    console.error("GET /user error:", err);
    res.status(500).json({ error: err.message });
  }
});

route.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("POST /user error:", err);
    res.status(400).json({ error: err.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) return res.status(404).json({ message: "User not found" });

    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    console.error("PUT /user/:id error:", err);
    res.status(400).json({ error: err.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(204).send();
  } catch (err) {
    console.error("DELETE /user/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = route;
