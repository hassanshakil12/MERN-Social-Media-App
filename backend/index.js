import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.route.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

// Routers
app.use("/api/user", userRouter);

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
