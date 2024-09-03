import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import { UPLOAD_DIR } from "./utils/staticFilePath.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

// Middlewares
app.use("/uploads", express.static(UPLOAD_DIR));
app.use(express.json());
app.use(bodyParser.json());

// CORS Middleware
app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

// Routers
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.get("*", (req, res) => {
  res.status(404).json({ Message: "Page not found" });
});

connectDB()
  .then(() => {
    app.listen(port, (err) => {
      err
        ? console.error(err)
        : console.log(`Server connected successfully \nPort: ${port}`);
    });
  })
  .catch((err) => console.error(err));
