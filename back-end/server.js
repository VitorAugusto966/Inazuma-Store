require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const routes = require("./routes/routes")
const authMiddleware = require("./middleware/authMiddleware");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/*app.use((req, res, next) => {
  if (req.path === "/api/users/login" || req.path === "/api/users/register") {
    return next();
  }
  authMiddleware(req, res, next);
});*/

app.use("/api/", routes);



const startServer = async () => {
  try {
    await sequelize.authenticate(); 
    console.log("Banco de dados conectado!");

    await sequelize.sync();
    console.log("Tabelas sincronizadas!");

    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();
