const Order = require("../model/Order");
const OrderItem = require("../model/OrderItem");
const axios = require("axios");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { enviarEmail } = require("../controller/emailController");

const PRODUCT_API_URL = "https://dummyjson.com/products";

const OrderController = {
    async createOrder(req, res) {
        try {
            const { userId, shippingAddress, items, totalAmount, paymentStatus, email } = req.body;
            if (!userId || !items || !Array.isArray(items) || totalAmount == null || !email) {
                return res.status(400).json({ error: "Dados inválidos" });
            }

            const order = await Order.create({ userId, shippingAddress, totalAmount, paymentStatus });

            let orderItems = [];
            for (const item of items) {
                const { data: product } = await axios.get(`${PRODUCT_API_URL}/${item.productId}`);

                const orderItem = await OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    productName: product.title,
                    productPrice: product.price,
                    quantity: item.quantity,
                    subtotal: product.price * item.quantity,
                    productThumbnail: product.thumbnail,
                });

                orderItems.push(orderItem);
            }

            const pdfPath = path.join(__dirname, `../../temp/order_${order.id}.pdf`);
            await generateOrderPDF(order, orderItems, pdfPath);

            await enviarEmail({
                destinatario: email,
                assunto: "Confirmação do Pedido - Inazuma Store",
                mensagem: "Obrigado por escolher a Inazuma Store, segue em anexo a Nota Fiscal da sua compra.",
                anexos: [{ filename: `pedido_${order.id}.pdf`, path: pdfPath }]
            });

            return res.status(201).json({ message: "Pedido criado e e-mail enviado!", orderId: order.id });
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            return res.status(500).json({ error: "Erro ao criar pedido", details: error.message });
        }
    },
    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ error: "O novo status é obrigatório" });
            }

            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ error: "Pedido não encontrado" });
            }

            order.status = status;
            await order.save();

            return res.json({ message: "Status do pedido atualizado com sucesso", order });
        } catch (error) {
            console.error("Erro ao atualizar status do pedido:", error);
            return res.status(500).json({ error: "Erro ao atualizar status", details: error.message });
        }
    },
    async getOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id, { include: OrderItem });

            if (!order) {
                return res.status(404).json({ error: "Pedido não encontrado" });
            }

            return res.json(order);
        } catch (error) {
            console.error("Erro ao buscar pedido:", error);
            return res.status(500).json({ error: "Erro ao buscar pedido", details: error.message });
        }
    },

    async getAllUserOrders(req, res) {
        try {
            const { userId } = req.params;

            const orders = await Order.findAll({
                where: { userId },
                include: { model: OrderItem },
            });

            if (!orders.length) {
                return res.status(404).json({ error: "Nenhum pedido encontrado para este usuário" });
            }

            return res.json(orders);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            return res.status(500).json({ error: "Erro ao buscar pedidos", details: error.message });
        }
    },
};

async function generateOrderPDF(order, orderItems, filePath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });

        const tempDir = path.join(__dirname, "../../temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc
            .font("Helvetica-Bold")
            .fontSize(18)
            .fillColor("#1a73e8")
            .text("INAZUMA STORE LTDA", { align: "center" });

        doc.fontSize(10).fillColor("#000").text("CNPJ: 99.999.999/9999-99", { align: "center" });
        doc.text("Endereço: Rua Inazuma, 123 - Inazuma/SP", { align: "center" });
        doc.text("Telefone: (18) 99999-9999", { align: "center" });
        doc.moveDown();

        doc
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .strokeColor("#000")
            .lineWidth(1)
            .stroke();

        doc.moveDown();
        doc.fontSize(12).fillColor("#000").text(`Pedido Nº: ${order.id}`);
        doc.text(`Cliente ID: ${order.userId}`);
        doc.text(`Endereço de entrega: ${order.shippingAddress}`);
        doc.text(`Status do pagamento: ${order.paymentStatus}`);
        doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`);
        doc.moveDown();

        doc
            .font("Helvetica-Bold")
            .fontSize(10)
            .fillColor("#000");

        const startX = 50;
        const columnWidths = { produto: 200, qtd: 50, valor: 100, subtotal: 100 };

        doc.text("Produto", startX, doc.y, { width: columnWidths.produto })
            .text("Qtd", startX + columnWidths.produto, doc.y, { width: columnWidths.qtd, align: "right" })
            .text("Valor Unit.", startX + columnWidths.produto + columnWidths.qtd, doc.y, { width: columnWidths.valor, align: "right" })
            .text("Subtotal", startX + columnWidths.produto + columnWidths.qtd + columnWidths.valor, doc.y, { width: columnWidths.subtotal, align: "right" });

        doc.moveDown();

        doc
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .strokeColor("#ddd")
            .lineWidth(1)
            .stroke();

        doc.moveDown();

        doc.font("Helvetica").fontSize(10).fillColor("#000");

        orderItems.forEach((item) => {
            doc
                .text(item.productName, startX, doc.y, { width: columnWidths.produto })
                .text(`${item.quantity}`, startX + columnWidths.produto, doc.y, { width: columnWidths.qtd, align: "right" })
                .text(`R$ ${6 * item.productPrice.toFixed(2)}`, startX + columnWidths.produto + columnWidths.qtd, doc.y, { width: columnWidths.valor, align: "right" })
                .text(`R$ ${6 * item.subtotal.toFixed(2)}`, startX + columnWidths.produto + columnWidths.qtd + columnWidths.valor, doc.y, { width: columnWidths.subtotal, align: "right" });

            doc.moveDown();
        });

        doc
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .strokeColor("#ddd")
            .lineWidth(1)
            .stroke();

        doc.moveDown();

        doc
            .font("Helvetica-Bold")
            .fontSize(14)
            .fillColor("#fff")
            .rect(50, doc.y + 10, 500, 25)
            .fill("#1a73e8")
            .fillColor("#fff")
            .text(`TOTAL A PAGAR: R$ ${order.totalAmount.toFixed(2)}`, 50, doc.y + 15, {
                align: "right",
                width: 500,
            });

        doc.moveDown(3);

        doc
            .fontSize(10)
            .fillColor("#000")
            .text("Obrigado por comprar na Inazuma Store!", { align: "center" });

        doc.end();

        stream.on("finish", () => {
            stream.close(() => resolve());
        });

        stream.on("error", reject);
    });
}

module.exports = OrderController;
