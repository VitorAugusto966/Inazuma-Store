const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Seller = require("../model/Seller");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, type } = decoded;

        let user;

        if (type === "user" || type == "admin") {
            user = await User.findByPk(id);
        } else if (type === "seller") {
            user = await Seller.findByPk(id);
        }

        if (!user) {
            return res.status(404).json({ message: `${type === 'seller' ? 'Vendedor' : 'Usuário'} não encontrado` });
        }

        req.userId = user.id;
        req.userType = type;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
