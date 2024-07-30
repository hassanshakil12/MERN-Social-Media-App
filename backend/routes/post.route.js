import express from "express";
import Post from "../models/post.model.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user._id,
      content: req.body.content,
    });

    const newPost = await post.save();
    res.status(201).json({ newPost, message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server not responding" });
  }
});

export default router