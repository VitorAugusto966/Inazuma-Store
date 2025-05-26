const base_URL = "http://localhost:3001/api/";

export async function loginSeller(email, senha) {
    try {
        const response = await fetch(`${base_URL}sellers/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            throw new Error("Erro ao efetuar login do vendedor");
        }

        const data = await response.json();
        console.log("Login vendedor:", data);
        return data.seller;
    } catch (error) {
        console.error("Erro no login do vendedor:", error);
        return null;
    }
}

export async function registerSeller(nome_loja, nome_vendedor, email, senha, cnpj) {
    try {
        const response = await fetch(`${base_URL}sellers/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_loja, nome_vendedor, email, senha, cnpj })
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data?.error || "Erro ao registrar vendedor");
        }

        return data;
    } catch (error) {
        console.error("Erro ao registrar vendedor:", error);
        throw error;
    }
}

export async function getSellerData(sellerId) {
    try {
        const response = await fetch(`${base_URL}sellers/${sellerId}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar vendedor");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar vendedor:", error);
        return null;
    }
}

export async function updateSeller(id, updatedFields) {
    try {
        const response = await fetch(`${base_URL}sellers/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields)
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar vendedor");
        }

        const data = await response.json();
        console.log("Vendedor atualizado:", data);
        return data.seller;
    } catch (error) {
        console.error("Erro ao atualizar vendedor:", error);
        return null;
    }
}

export async function resetSellerPassword(email) {
    try {
        const response = await fetch(`${base_URL}sellers/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error("Erro ao solicitar redefinição de senha");
        }

        const data = await response.json();
        console.log("Reset de senha solicitado:", data);
        return data;
    } catch (error) {
        console.error("Erro ao solicitar redefinição de senha:", error);
        return null;
    }
}

export async function getAllProducts() {
    try {
        const response = await fetch(`${base_URL}products`);
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return null;
    }
}

export async function getProductsBySeller(sellerId) {
    try {
        const response = await fetch(`${base_URL}products/${sellerId}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos do vendedor");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos do vendedor:", error);
        return null;
    }
}

export async function createProduct(productData) {
    try {
        const response = await fetch(`${base_URL}products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar produto");
        }

        const data = await response.json();
        console.log("Produto criado:", data);
        return data;
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        return null;
    }
}

export async function updateProduct(productId, updatedFields) {
    try {
        const response = await fetch(`${base_URL}products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields)
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar produto");
        }

        const data = await response.json();
        console.log("Produto atualizado:", data);
        return data;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return null;
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await fetch(`${base_URL}products/${productId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar produto");
        }

        console.log(`Produto ${productId} deletado com sucesso.`);
        return true;
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        return false;
    }
}

export async function getPedidosSeller(token) {
    const response = await fetch(`${base_URL}sellers/pedidos`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar pedidos do vendedor.");
    }

    const data = await response.json();
    return data;
}