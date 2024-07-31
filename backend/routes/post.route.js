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

router.get("/", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["username", "email"])
      .populate("comment.user", ["username"])
      .populate("likes", ["username"]);

    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server not responding" });
  }
});

router.post("/like/:id", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ post, message: "Post not found" });

    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);

      await post.save();
      return res.status(200).json({ post, message: "Post liked successfully" });
    }

    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter((id) => {
        id.toString() !== req.user._id.toString();
      });

      await post.save();
      return res.status(200).json({ message: "Post unliked successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server not responding" });
  }
});

router.post("/comment/:id", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const comment = post.comment;
    comment.push({
      user: req.user._id,
      content: req.body.content,
    });

    await post.save();

    res.status(201).json({
      comment: comment[comment.length - 1],
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server not responding" });
  }
});

export default router;
