const jwt = require("jsonwebtoken");

const authenthication = async (req, res, next) => {
  try {
    console.log(req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization failed" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.staff = decoded;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ error: "Authorization error! JWT mismatch" });
  }
};

module.exports = authenthication;
