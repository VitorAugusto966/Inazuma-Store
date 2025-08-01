import { Routes, Route } from "react-router-dom";
import Private from "./Private";
import PrivateAdmin from "./PrivateAdmin";
import Login from "../pages/login/index";
import CadastroUsuario from "../pages/usuario/cadUsuario/index";
import Home from "../pages/home/index";
import Profile from "../pages/usuario/perfil/index";
import Endereco from "../pages/usuario/endereco/index";
import Cart from "../pages/cart/index";
import Favorito from "../pages/produto/favorito/index";
import RedefinirSenha from "../pages/usuario/redefinirSenha/index";
import PedidoMap from "../pages/pedido/map-pedido/index";
import MeusPedidos from "../pages/pedido/view-pedido/index";
import DetailPedido from "../pages/pedido/detail-pedido/index";
import Cupons from "../pages/usuario/cupom/index";
import Checkout from "../pages/pedido/checkout/index";
import Error from "../pages/components/error";
import Categoria from "../pages/produto/categoria/index";
import Busca from "../pages/produto/busca/index";
import ProdutoDetalhe from "../pages/produto/produto-detalhe/index";
import AdminUsuarios from "../pages/admin/usuario/index";
import AdminCupons from "../pages/admin/cupom/index";
import AdminHome from "../pages/admin/home/index";
import AdminDashboard from "../pages/admin/dashboard/index";
import AdminPedidos from "../pages/admin/pedido/index";
import AdminGerenciarPedido from "../pages/admin/pedido/gerenciamento/index";
import CadastroVendedor from "../pages/vendedor/cadVendedor/index";
import VendedorHome from "../pages/vendedor/home/index";
import CadastroProduto from "../pages/vendedor/produto/cadProduto/index";
import ViewProdutos from "../pages/vendedor/produto/viewProduto/index";
import ProdutoVendedorDetalhe from "../pages/vendedor/produto/produto-detalhe/index";
import EditarProdutoVendedor from "../pages/vendedor/produto/editProduto/index";
import VendedorPedidos from "../pages/vendedor/pedido/viewPedidos/index";
import CheckoutCreditCard from "../pages/pedido/checkout/checkoutCreditCard";
import CheckoutPix from "../pages/pedido/checkout/checkoutPix";

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
      <Route path="/produto-detalhes" element={<ProdutoDetalhe />} />
      <Route path="/checkout-card" element={<CheckoutCreditCard />} />
      <Route path="/checkout-pix" element={<CheckoutPix />} />

      {/* Rotas protegidas */}
      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />
      <Route
        path="/endereco"
        element={
          <Private>
            <Endereco />
          </Private>
        }
      />
      <Route
        path="/cart"
        element={
          <Private>
            <Cart />
          </Private>
        }
      />
      <Route
        path="/checkout"
        element={
          <Private>
            <Checkout />
          </Private>
        }
      />
      <Route
        path="/cupons"
        element={
          <Private>
            <Cupons />
          </Private>
        }
      />
      <Route
        path="/favorito"
        element={
          <Private>
            <Favorito />
          </Private>
        }
      />
      <Route
        path="/pedidos"
        element={
          <Private>
            <MeusPedidos />
          </Private>
        }
      />
      <Route
        path="/pedido-map"
        element={
          <Private>
            <PedidoMap />
          </Private>
        }
      />
      <Route
        path="/pedido-detalhe"
        element={
          <Private>
            <DetailPedido />
          </Private>
        }
      />

      {/* Rotas ADMIN */}
      <Route
        path="/admin"
        element={
          <PrivateAdmin>
            <AdminHome />
          </PrivateAdmin>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <PrivateAdmin>
            <AdminUsuarios />
          </PrivateAdmin>
        }
      />
      <Route
        path="/admin/cupons"
        element={
          <PrivateAdmin>
            <AdminCupons />
          </PrivateAdmin>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateAdmin>
            <AdminDashboard />
          </PrivateAdmin>
        }
      />
      <Route
        path="/admin/pedidos"
        element={
          <PrivateAdmin>
            <AdminPedidos />
          </PrivateAdmin>
        }
      />
      <Route
        path="/admin/pedidos/gerenciar"
        element={
          <PrivateAdmin>
            <AdminGerenciarPedido />
          </PrivateAdmin>
        }
      />

      {/* Rotas Vendedor*/}
      <Route path="/cadastro-vendedor" element={<CadastroVendedor />} />
      <Route path="/vendedor" element={<VendedorHome />} />
      <Route path="/vendedor/produto/novo" element={<CadastroProduto />} />
      <Route path="/vendedor/produtos/" element={<ViewProdutos />} />
      <Route
        path="/vendedor/produto-detalhe"
        element={<ProdutoVendedorDetalhe />}
      />
      <Route
        path="/vendedor/produto/editar"
        element={<EditarProdutoVendedor />}
      />
      <Route path="/vendedor/pedidos" element={<VendedorPedidos />} />

      {/* Redirecionamento para páginas não encontradas */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default RoutesApp;
