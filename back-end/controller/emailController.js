const transporter = require("../config/nodemailer");

async function enviarEmail({ destinatario, assunto, mensagem }) {
    try {
        const info = await transporter.sendMail({
            from: `"Inazuma Store" <${process.env.USER_EMAIL}>`,
            to: destinatario,
            subject: assunto,
            html: `<p>${mensagem}</p>`
        });

        //console.log("E-mail enviado com sucesso:", info.messageId);
    } catch (error) {
        //console.error("Erro ao enviar e-mail:", error);
        throw new Error("Erro ao enviar e-mail!");
    }
}

module.exports = { enviarEmail };
