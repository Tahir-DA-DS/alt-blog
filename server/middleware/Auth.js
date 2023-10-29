const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: "unauthorized" });
    }
  };