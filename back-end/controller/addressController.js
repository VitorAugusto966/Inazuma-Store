const Endereco = require("../model/Address");
const User = require("../model/User");

exports.criarEndereco = async (req, res) => {
    try {
        const { rua, numero, bairro, cidade, estado, cep } = req.body;
        const { userId } = req.params;

        const usuarioExiste = await User.findByPk(userId);
        if (!usuarioExiste) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        const endereco = await Endereco.create({ userId, rua, numero, bairro, cidade, estado, cep });
        res.status(201).json(endereco);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar endereço", error });
    }
};

exports.obterEndereco = async (req, res) => {
    try {
        const { userId } = req.params;

        const endereco = await Endereco.findOne({ where: { userId } });
        if (!endereco) {
            return res.status(404).json({ message: "Endereço não encontrado!" });
        }

        res.json(endereco);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar endereço", error });
    }
};

exports.atualizarEndereco = async (req, res) => {
    try {
        const { rua, numero, cidade, estado, cep } = req.body;
        const { userId } = req.params;

        const endereco = await Endereco.findOne({ where: { userId } });
        if (!endereco) {
            return res.status(404).json({ message: "Endereço não encontrado!" });
        }

        await endereco.update({ rua, numero, cidade, estado, cep });
        res.json({ message: "Endereço atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar endereço", error });
    }
};

exports.deletarEndereco = async (req, res) => {
    try {
        const { userId } = req.params;

        const endereco = await Endereco.findOne({ where: { userId } });
        if (!endereco) {
            return res.status(404).json({ message: "Endereço não encontrado!" });
        }

        await endereco.destroy();
        res.json({ message: "Endereço deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar endereço", error });
    }
};
