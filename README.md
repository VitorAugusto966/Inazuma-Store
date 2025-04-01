# 🛒 Inazuma Store

**Inazuma Store** é uma plataforma de e-commerce moderna e intuitiva, projetada para oferecer uma excelente experiência de compra online. O projeto inclui funcionalidades completas, como gerenciamento de produtos, carrinho de compras, favoritos, rastreamento de pedidos e cupons de desconto.

## 🌍 Acesse Online
🔗 [Inazuma Store - Versão Online](https://inazuma-store.netlify.app/)  

✅ **Não é necessário login** para explorar a loja!  

⚠️ **Nota:** A versão online da Inazuma Store possui apenas **dados estáticos** para pedidos, usuários e cupons.  
Isso significa que algumas funcionalidades **não estão disponíveis**, pois dependem do back-end.  

Você ainda pode visualizar as telas, testar a navegação e explorar a experiência do usuário! 🚀  

## 🚀 Tecnologias Utilizadas

### **Frontend**
- React.js
- Redux (para gerenciamento de estado)
- React Router (para navegação)
- Bootstrap (para estilização)
- Leaflet (para rastreamento de pedidos)

### **Backend**
- Node.js + Express
- MySQL (banco de dados)
- JWT (para autenticação)
- Nodemailer (envio de emails)
## 🎯 Funcionalidades

### **🛍️  Produtos**
- Listagem de produtos em destaque
- Filtragem de produtos por categoria
- Barra de pesquisa para encontrar produtos específicos

### **❤️ Favoritos**
- Adicionar ou remover produtos da lista de favoritos
- Persistência dos favoritos para usuários autenticados

### **🛒 Carrinho de Compras**
- Adicionar e remover itens
- Atualizar quantidades
- Cálculo automático do total da compra

### **🏠 Perfil e Endereços**
- Gerenciamento de informações do usuário
- Cadastro e edição de endereços de entrega

### **📦 Pedidos e Rastreamento**
- Visualização dos pedidos realizados
- Detalhes completos de cada pedido
- Rastreamento do pedido utilizando **Leaflet**

### **🎟️ Cupons de Desconto**
- Aplicação de cupons válidos na finalização da compra

## 🚀 Como Rodar o Projeto

### **1️⃣ Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/inazuma-store.git
cd inazuma-store
```

### **2️⃣ Instalar Dependências do Frontend**
```sh
npm install
```

### **3️⃣ Rodar o Frontend**
```sh
npm start
```

### **4️⃣ Configurar o Backend**
No diretório `back-end`, crie um arquivo `.env` e adicione as seguintes variáveis de ambiente:

```sh
DB_HOST=
DB_NAME=inazuma_store
DB_USER=
DB_PASS=
JWT_SECRET=

USER_EMAIL=""
PASSWORD_EMAIL=
HOST_EMAIL=""
PORT_EMAIL=

```
Preencha os valores de acordo com suas credenciais.

### **5️⃣ Rodar o Backend**
```sh
cd back-end
node server.js
```

## Licença
Este projeto é open-source e está sob a licença [MIT](LICENSE).

