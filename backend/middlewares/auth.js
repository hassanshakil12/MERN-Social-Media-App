import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  // console.log(authHeader);
  // console.log(token);

  if (token == null) {
    return res.status(404).json({ Message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    // console.log(req.user);
    next();
  });
};

export default authenticateToken;
