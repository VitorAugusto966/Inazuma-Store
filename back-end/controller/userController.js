const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const crypto = require("crypto");
const { enviarEmail } = require("../controller/emailController");
require("dotenv").config();


const UserController = {
  async register(req, res) {
    try {
      const { nome_social, nome_usuario, email, data_nascimento, senha } = req.body;

      if (!nome_usuario || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "E-mail já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

      const user = await User.create({
        nome_social,
        nome_usuario,
        email,
        data_nascimento,
        senha: hashedPassword
      });

      return res.status(201).json({ message: "Usuário criado com sucesso!", user });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao registrar usuário", details: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const isMatch = await bcrypt.compare(senha, user.senha);
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

      return res.json({ message: "Login bem-sucedido!", user: { ...userWithoutPassword, token } });

    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ error: "Erro ao realizar login", details: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome_social, nome_usuario, data_nascimento } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (nome_social) user.nome_social = nome_social;
      if (nome_usuario) user.nome_usuario = nome_usuario;
      if (data_nascimento) user.data_nascimento = data_nascimento;

      await user.save();

      const userWithoutPassword = user.get({ plain: true });
      delete userWithoutPassword.senha;

      return res.json({ message: "Usuário atualizado com sucesso!", user: userWithoutPassword });

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
    }
  },


  async resetPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "E-mail é obrigatório" });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const novaSenha = crypto.randomBytes(5).toString("hex");
      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      await user.update({ senha: hashedPassword }, { hooks: false });

      await enviarEmail({
        destinatario: user.email,
        assunto: "🔑 Recuperação de Senha - Inazuma Store",
        mensagem: `Olá, ${user.nome_usuario}! <br/><br/>
                  Sua nova senha temporária é: <strong>${novaSenha}</strong> <br/><br/>
                  Por segurança, recomendamos que você altere essa senha ao fazer login.`,
        anexos: []
      });

      return res.json({ message: "Uma nova senha foi enviada para seu e-mail!" });

    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      return res.status(500).json({ error: "Erro ao redefinir senha", details: error.message });
    }
  }

};

module.exports = UserController;
