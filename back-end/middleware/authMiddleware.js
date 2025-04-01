const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token necessário!" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Formato de token inválido!" });
  }

  const token = tokenParts[1];

  if (!process.env.JWT_SECRET) {
    console.error("Erro: JWT_SECRET não definido no ambiente!");
    return res.status(500).json({ message: "Erro interno no servidor" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado!" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido!" });
    }
    return res.status(500).json({ message: "Erro ao validar token!" });
  }
};
