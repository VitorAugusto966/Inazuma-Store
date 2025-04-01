import { Routes, Route } from "react-router-dom";
import Private from "./Private";
import Login from "../pages/login";
import CadastroUsuario from "../pages/usuario/cadUsuario";
import Home from "../pages/home";
import Profile from "../pages/usuario/perfil";
import Endereco from "../pages/usuario/endereco";
import Cart from "../pages/cart";
import Favorito from "../pages/produto/favorito";
import RedefinirSenha from "../pages/usuario/redefinirSenha";
import PedidoMap from "../pages/pedido/map-pedido";
import MeusPedidos from "../pages/pedido/view-pedido";
import DetailPedido from "../pages/pedido/detail-pedido";
import Cupons from "../pages/usuario/cupom";
import Checkout from "../pages/pedido/checkout"
import Error from "../pages/components/error"
import Categoria from '../pages/produto/categoria'
import Busca from "../pages/produto/busca";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            <Route path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route path="/categoria/:categoria" element={<Categoria />} />
            <Route path="/busca/:produto" element={<Busca />} /> 

            {/* Rotas protegidas */}
            <Route path="/profile" element={<Private><Profile /></Private>} />
            <Route path="/endereco" element={<Private><Endereco /></Private>} />
            <Route path="/cart" element={<Private><Cart /></Private>} />
            <Route path="/checkout" element={<Private><Checkout /></Private>} />
            <Route path="/cupons" element={<Private><Cupons /></Private>} />
            <Route path="/favorito" element={<Private><Favorito /></Private>} />
            <Route path="/pedidos" element={<Private><MeusPedidos /></Private>} />
            <Route path="/pedido-map" element={<Private><PedidoMap /></Private>} />
            <Route path="/pedido-detalhe" element={<Private><DetailPedido /></Private>} />


            {/* Redirecionamento para páginas não encontradas */}
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RoutesApp;
