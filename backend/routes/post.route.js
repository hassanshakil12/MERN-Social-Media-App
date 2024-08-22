import express from "express";
import Post from "../models/post.model.js";
import { upload } from "../middlewares/multer.config.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

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

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("user", ["username", "email"])
      .populate("comment.user", ["username"])
      .populate("likes", ["username"]);

    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ post, message: "Post found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ messahe: "Server not responding" });
  }
});

router.post(
  "/create",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const imageFile = req.file;
      console.log(imageFile);

      const { caption } = req.body;

      const content = [];

      if (!imageFile && !caption)
        return res
          .status(404)
          .json({ message: "Atleast provide one, image or caption" });

      if (caption) {
        content.push({ caption });
      }

      if (imageFile) {
        const image = imageFile.filename;
        content.push({ image });
      }

      const post = await Post.create({
        user: req.user._id,
        content: content,
      });

      const newPost = await post.save();
      res.status(201).json({ newPost, message: "Post created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server not responding" });
    }
  }
);

router.post("/like/:id", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // if(post.likes.includes(req.user._id)) return res.status(403).json({message: "User has already liked"})

    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);

      await post.save();
    }

    return res.status(200).json({ post, message: "Post liked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server not responding" });
  }
});

router.post("/unlike/:id", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.likes.includes(req.user._id))
      return res.status(412).json({ message: "User has not liked" });

    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );

      await post.save();
    }

    return res
      .status(200)
      .json({ post, message: "Post unliked successfully!!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server noot responding" });
  }
});

router.post("/comment/:id", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("comment.user", [
      "username",
    ]);
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
