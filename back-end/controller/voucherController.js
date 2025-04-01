const Voucher = require("../model/Voucher");
const User = require("../model/User");
const UserVoucher = require("../model/UserVoucher");

const VoucherController = {
    async createVoucher(req, res) {
        try {
            const { name, description, expirationDate } = req.body;

            if (!name || !description || !expirationDate) {
                return res.status(400).json({ error: "Dados inválidos" });
            }

            const voucher = await Voucher.create({ name, description, expirationDate });
            return res.status(201).json(voucher);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar o voucher", details: error.message });
        }
    },

    async getAllVouchers(req, res) {
        try {
            const vouchers = await Voucher.findAll();
            return res.json(vouchers);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar os vouchers", details: error.message });
        }
    },

    async getVoucherById(req, res) {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findByPk(id);

            if (!voucher) {
                return res.status(404).json({ error: "Voucher não encontrado" });
            }

            return res.json(voucher);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar o voucher", details: error.message });
        }
    },

    async assignVoucherToUser(req, res) {
        try {
            const { idUser, voucherName } = req.body;

            if (!idUser || !voucherName) {
                return res.status(400).json({ error: "Dados inválidos" });
            }

            const user = await User.findByPk(idUser);
            const voucher = await Voucher.findOne({ where: { name: voucherName } });

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            if (!voucher) {
                return res.status(404).json({ error: "Voucher não encontrado" });
            }

            const existing = await UserVoucher.findOne({ where: { idUser, idVoucher: voucher.id } });
            if (existing) {
                return res.status(400).json({ error: "Usuário já possui este voucher" });
            }

            await UserVoucher.create({ idUser, idVoucher: voucher.id });
            return res.status(201).json({ message: "Voucher atribuído ao usuário com sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atribuir voucher ao usuário", details: error.message });
        }
    },

    async getUserVouchers(req, res) {
        try {
            const { idUser } = req.params;

            const user = await User.findByPk(idUser, {
                include: {
                    model: Voucher,
                    through: { attributes: [] },
                },
            });

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            return res.json(user.Vouchers);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar vouchers do usuário", details: error.message });
        }
    },

    async useVoucher(req, res) {
        try {
            const { idUser, idVoucher } = req.body;

            if (!idUser || !idVoucher) {
                return res.status(400).json({ error: "Dados inválidos" });
            }

            const userVoucher = await UserVoucher.findOne({ where: { idUser, idVoucher } });

            if (!userVoucher) {
                return res.status(404).json({ error: "Voucher não encontrado para este usuário" });
            }

            if (userVoucher.used) {
                return res.status(400).json({ error: "Voucher já foi utilizado" });
            }

            userVoucher.used = true;
            await userVoucher.save();

            return res.json({ message: "Voucher utilizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao marcar voucher como utilizado", details: error.message });
        }
    },

    async deleteVoucher(req, res) {
        try {
            const { id } = req.params;

            const deleted = await Voucher.destroy({ where: { id } });

            if (!deleted) {
                return res.status(404).json({ error: "Voucher não encontrado" });
            }

            return res.json({ message: "Voucher excluído com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao excluir o voucher", details: error.message });
        }
    }
};

module.exports = VoucherController;
