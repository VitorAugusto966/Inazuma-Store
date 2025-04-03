const transporter = require("../config/nodemailer");

async function enviarEmail({ destinatario, assunto, mensagem, anexos = [] }) {
    try {
        const info = await transporter.sendMail({
            from: `"Inazuma Store" <${process.env.USER_EMAIL}>`,
            to: destinatario,
            subject: assunto,
            html: `<p>${mensagem}</p>`,
            attachments: anexos, 
        });
    } catch (error) {
        throw new Error("Erro ao enviar e-mail!");
    }
}

module.exports = { enviarEmail };
