const base_URL = "http://localhost:3001/api/orders";

export async function createOrder(userId, shippingAddress, items, totalAmount, token, paymentStatus, email) {
    try {
        if (!token) throw new Error("Usuário não autenticado!");

        const response = await fetch(base_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, shippingAddress, items, totalAmount, paymentStatus, email }) 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao criar pedido");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao criar pedido:", error.message);
        return null;
    }
}

export async function getOrder(orderId, token) {
    try {
        if (!token) throw new Error("Usuário não autenticado!");

        const response = await fetch(`${base_URL}/${orderId}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao buscar pedido");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar pedido:", error.message);
        return null;
    }
}

export async function getAllUserOrders(userId, token) {
    try {
        if (!token) throw new Error("Usuário não autenticado!");

        const response = await fetch(`${base_URL}/user/${userId}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao buscar pedidos do usuário");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar pedidos do usuário:", error.message);
        return null;
    }
}


