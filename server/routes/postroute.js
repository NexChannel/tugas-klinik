const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: "user" }],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Gagal memuat posts" });
  }
});

// GET POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, as: "user" }],
    });

    if (!post) return res.status(404).json({ message: "Data tidak ditemukan" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post); // FIXED
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated)
      return res.status(404).json({ message: "Post tidak ditemukan" });

    const updatedPost = await Post.findByPk(req.params.id);
    res.json(updatedPost); // FIXED
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deleted)
      return res.status(404).json({ message: "Post tidak ditemukan" });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus post" });
  }
});

module.exports = router;
