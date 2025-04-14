const base_URL = "http://localhost:3001/api/admin";

export async function getUsuariosAdmin(token) {
    try {
      const response = await fetch(`${base_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao listar usuários");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  }
  

export async function deletarUsuarioAdmin(id) {
  try {
    const response = await fetch(`${base_URL}/deletarUsuario/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao deletar usuário");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return null;
  }
}

export async function getPedidosAdmin() {
  try {
    const response = await fetch(`${base_URL}/listarPedidos`);
    if (!response.ok) {
      throw new Error("Erro ao listar pedidos");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return [];
  }
}

export async function getCuponsAdmin() {
  try {
    const response = await fetch(`${base_URL}/listarCupons`);
    if (!response.ok) {
      throw new Error("Erro ao listar cupons");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    return [];
  }
}

export async function criarCupom(codigo, desconto, validade) {
  try {
    const response = await fetch(`${base_URL}/criarCupom`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo, desconto, validade }),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar cupom");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar cupom:", error);
    return null;
  }
}

export async function deletarCupom(id) {
  try {
    const response = await fetch(`${base_URL}/deletarCupom/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao deletar cupom");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar cupom:", error);
    return null;
  }
}

export async function getDashboardStats() {
  try {
    const response = await fetch(`${base_URL}/dashboard`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do dashboard");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dashboard:", error);
    return null;
  }
}
