const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Seller = require("../model/Seller");
require("dotenv").config();

const LoginController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            let seller = 0;

            if (!email || !senha) {
                return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
            }

            let user = await User.findOne({ where: { email } });

            if (!user) {
                user = await Seller.findOne({ where: { email }});
                seller = 1;
                //console.log(user);
            }
            
            if (!user) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }
            const isMatch = await bcrypt.compare(senha, user.senha);
            console.log(isMatch);
            if (!isMatch) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            const userWithoutPassword = user.get({ plain: true });
            delete userWithoutPassword.senha;

            console.log(userWithoutPassword)
            return res.json({ message: "Login bem-sucedido!", user: { ...userWithoutPassword, token } });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ error: "Erro ao realizar login", details: error.message });
        }
    },
}

module.exports = LoginController;