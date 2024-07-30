import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server not responding" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ Message: "User not found" });
    // console.log(user);

    const password = await bcrypt.compare(req.body.password, user.password);

    if (!password)
      return res.status(400).json({ Message: "Password is incorrect" });

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY
    );

    res
      .status(200)
      .header("Authorization", "Bearer " + token)
      .json({ token: token, Message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server not responding" });
  }
});

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ Message: "User not found" });
    const profile = await User.findById(req.user._id);

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server not responding" });
  }
});

router.post("/follow/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const followedUser = await User.findById(id);
    if (!followedUser)
      return res.status(404).json({ Message: "User not found" });

    const currentUser = await User.findById(req.user._id);

    if (!currentUser.following.includes(followedUser._id)) {
      currentUser.following.push(followedUser._id);
      await currentUser.save();
    }

    if (!followedUser.followers.includes(currentUser._id)) {
      followedUser.followers.push(currentUser._id);
      await followedUser.save();
    }

    res.status(201).json({ Message: "User followed Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server not responding" });
  }
});

router.post("/unfollow/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const userToUnfollow = await User.findById(id);
    if (!userToUnfollow)
      return res.status(404).json({ Message: "User not found" });

    const currentUser = await User.findById(req.user._id);

    if (currentUser.following.includes(userToUnfollow._id)) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userToUnfollow._id.toString()
      );
      await currentUser.save();

      res.status(201).json({ Message: "User unfollowed successfully" });
    } else {
      res.status(200).json({ Message: "You are not following this user" });
    }

    if (userToUnfollow.followers.includes(currentUser._id)) {
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );

      await userToUnfollow.save();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server not responding" });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server not responding" });
  }
});

router.get("/explore", authenticateToken, async (req, res) => {
  try {
    const users = await User.find(_id);
    if (users.length === 0) {
      return res.status(404).json({ Message: "No user found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server not responding" });
  }
});

export default router;
