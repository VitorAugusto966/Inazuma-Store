const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../model/Seller");
const crypto = require("crypto");
const { enviarEmail } = require("../controller/emailController");

require("dotenv").config();

const SellerController = {
    async register(req, res) {
        try {
            const { nome_loja, nome_vendedor, email, senha } = req.body;

            if (!nome_loja || !nome_vendedor || !email || !senha) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios" });
            }

            const existingSeller = await Seller.findOne({ where: { email } });
            if (existingSeller) {
                return res.status(400).json({ error: "E-mail já cadastrado" });
            }

            const hashedPassword = await bcrypt.hash(senha, 10);

            const seller = await Seller.create({
                nome_loja,
                nome_vendedor,
                email,
                senha: hashedPassword
            });

            return res.status(201).json({ message: "Vendedor registrado com sucesso!", seller });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao registrar vendedor", details: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
            }

            const seller = await Seller.findOne({ where: { email } });
            if (!seller) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            const isMatch = await bcrypt.compare(senha, seller.senha);
            if (!isMatch) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            const token = jwt.sign(
                { id: seller.id, role: seller.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            const sellerWithoutPassword = seller.get({ plain: true });
            delete sellerWithoutPassword.senha;

            return res.json({
                message: "Login realizado com sucesso!",
                seller: { ...sellerWithoutPassword, token }
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro no login", details: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome_loja, nome_vendedor } = req.body;

            const seller = await Seller.findByPk(id);
            if (!seller) {
                return res.status(404).json({ message: "Vendedor não encontrado" });
            }

            if (nome_loja) seller.nome_loja = nome_loja;
            if (nome_vendedor) seller.nome_vendedor = nome_vendedor;

            await seller.save();

            const sellerWithoutPassword = seller.get({ plain: true });
            delete sellerWithoutPassword.senha;

            return res.json({ message: "Vendedor atualizado com sucesso!", seller: sellerWithoutPassword });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar vendedor", details: error.message });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
            const seller = await Seller.findByPk(id, {
                attributes: { exclude: ['senha'] }
            });
            if (!seller) {
                return res.status(404).json({ message: "Vendedor não encontrado" });
            }
            return res.json(seller);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar vendedor", details: error.message });
        }
    },
    async resetPassword(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: "E-mail é obrigatório" });
            }

            const seller = await Seller.findOne({ where: { email } });

            if (!seller) {
                return res.status(404).json({ error: "Vendedor não encontrado" });
            }

            const novaSenha = crypto.randomBytes(5).toString("hex");
            const hashedPassword = await bcrypt.hash(novaSenha, 10);

            await seller.update({ senha: hashedPassword }, { hooks: false });

            await enviarEmail({
                destinatario: seller.email,
                assunto: "🔑 Recuperação de Senha - Inazuma Store",
                mensagem: `Olá, ${seller.nome_vendedor}!<br/><br/>
                           Sua nova senha temporária é: <strong>${novaSenha}</strong><br/><br/>
                           Por segurança, altere essa senha após fazer login.`,
                anexos: []
            });

            return res.json({ message: "Uma nova senha foi enviada para seu e-mail!" });

        } catch (error) {
            console.error("Erro ao redefinir senha do vendedor:", error);
            return res.status(500).json({ error: "Erro ao redefinir senha", details: error.message });
        }
    }

};

module.exports = SellerController;
