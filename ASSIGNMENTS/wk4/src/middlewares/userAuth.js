import jwt from "jsonwebtoken";

const isUserAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ message: "Missing or malformed header!!!" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default isUserAuth;
