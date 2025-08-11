# 🛒 Inazuma Store

**Inazuma Store** é uma plataforma de e-commerce moderna e intuitiva, projetada para oferecer uma excelente experiência de compra online. O projeto inclui funcionalidades completas como gerenciamento de produtos, carrinho de compras, favoritos, rastreamento de pedidos, cupons de desconto, checkout com Pix e Cartão de Crédito, além de painéis administrativos e para vendedores.

## 🌍 Acesse Online (desatualizada)

🔗 [Inazuma Store - Versão Online](https://inazuma-store.netlify.app/)

✅ **Não é necessário login** para explorar a loja!

⚠️ **Nota:** A versão online da Inazuma Store possui apenas **dados estáticos** para pedidos, usuários e cupons. Algumas funcionalidades — como checkout e integração com pedidos reais — dependem do backend e funcionam apenas no ambiente local.

---

## 🚀 Tecnologias Utilizadas

### **🖥️ Frontend**

* ⚛️ **React.js** (estrutura da interface)
* 🔄 **Redux Toolkit** (gerenciamento de estado global)
* 🚏 **React Router DOM** (navegação SPA)
* 🎨 **Tailwind CSS** (estilização moderna e responsiva)
* 🎞️ **Framer Motion** (animações)
* 🗺️ **Leaflet** (rastreamento de pedidos com mapa interativo)

### **🖥️ Backend**

* 🟢 **Node.js + Express** (API REST)
* 🛢️ **MySQL** (banco de dados relacional)
* 🔑 **JWT** (autenticação segura via token)
* 📧 **Nodemailer** (envio de emails automáticos)
* 🔐 **bcryptjs** (criptografia de senhas)

---

## 🎯 Funcionalidades

### 🛍️ **Produtos**

* Listagem de produtos em destaque
* Filtragem por categoria
* Pesquisa por nome ou palavra-chave

### ❤️ **Favoritos**

* Adição e remoção de produtos favoritos
* Persistência dos favoritos para usuários autenticados

### 🛒 **Carrinho de Compras**

* Adição e remoção de produtos
* Atualização de quantidades
* Cálculo automático do total com cupons

### 💳 **Formas de Pagamento (Checkout)**

* **Pix**: geração de QR Code, chave Pix e atualização de status após confirmação
* **Cartão de Crédito**: formulário com validação de campos e envio seguro para processamento

### 🧑‍💼 **Área do Usuário**

* Edição de perfil
* Cadastro e gestão de endereços

### 📦 **Pedidos e Rastreamento**

* Listagem dos pedidos do usuário
* Detalhes completos de cada pedido
* Rastreamento com status + localização (Leaflet)

### 🎟️ **Cupons de Desconto**

* Aplicação de cupons válidos na finalização da compra
* Validação em tempo real

### 🔐 **Autenticação**

* Login/registro com JWT
* Criptografia segura de senhas
* Validação de tokens

---

## 🛠️ Painel Administrativo

O painel administrativo oferece controle total da loja, acessível apenas por usuários autenticados com permissão de administrador.

### Funcionalidades:

* 📦 Gerenciamento de Pedidos
* 📊 Dashboard com gráficos dinâmicos
* 📁 Listagem e filtro de Pedidos
* 🧑 Gestão de Usuários
* 🚚 **Modal de Gerenciamento de Rastreamento**

  * Alterar status de envio
  * Atualizar localização em tempo real

---

## 🧑‍💻 Painel do Vendedor

O painel do vendedor permite que cada vendedor gerencie seus próprios produtos de forma eficiente e autônoma.

### Funcionalidades:

* 📦 **Listagem de Produtos Cadastrados**
* ➕ **Cadastro de Novo Produto**
* ✏️ **Edição de Produto Existente**
* ❌ **Remoção de Produto**
* 📈 **Visualização de Detalhes do Produto** com layout moderno
* 🛒 **Integração com o sistema de pedidos**
* 🔍 **Interface otimizada e responsiva**

---

## 📂 Estrutura de Pastas (Checkout)

```
pages/
└── checkout/
    ├── index.jsx            <-- Arquivo principal do checkout
    ├── CheckoutCard/
    │   ├── index.jsx
    │   └── styles.css
    ├── CheckoutPix/
    │   ├── index.jsx
    │   └── styles.css
    └── styles.css           <-- Estilos globais do checkout (opcional)
```

---

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

---

## Licença

Este projeto é open-source e está sob a licença [MIT](LICENSE).
