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


export async function deletarUsuarioAdmin(id, token) {
  try {
    const response = await fetch(`${base_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao deletar usuário");
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return null;
  }
}

export async function getPedidosAdmin(token) {
  try {
    const response = await fetch(`${base_URL}/pedidos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao listar pedidos");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return [];
  }
}

export async function getCuponsAdmin(token) {
  try {
    const response = await fetch(`${base_URL}/cupons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao listar cupons");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    return [];
  }
}

export async function criarCupom(name, description, expirationDate, token) {
  try {
    const response = await fetch(`${base_URL}/cupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, expirationDate }),
    });
    if (!response.ok) throw new Error("Erro ao criar cupom");
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar cupom:", error);
    return null;
  }
}

export async function deletarCupom(id, token) {
  try {
    const response = await fetch(`${base_URL}/cupons/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao deletar cupom");
    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar cupom:", error);
    return null;
  }
}

export async function getDashboardStats(token) {
  try {
    const response = await fetch(`${base_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Erro ao buscar dados do dashboard");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dashboard:", error);
    return null;
  }
}
