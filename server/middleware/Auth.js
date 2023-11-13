require("dotenv").config();
const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user
      req.userId = decoded.user._id;
      next();
    } catch (error) {
      // return res.status(401).json({ message: "unauthorized" });
      console.log(error);
      res.clearCookie("token")
  
      return res.redirect('/')
    }
  };

  module.exports = authMiddleware