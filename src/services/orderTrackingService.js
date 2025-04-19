const base_URL = "http://localhost:3001/api/tracking";

export async function addTrackingEntry(orderId, status, location, estimatedDelivery, trackingCode,token) {
    try {
        if (!token) throw new Error("Usuário não autenticado!");

        const response = await fetch(base_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId, status, location, estimatedDelivery, trackingCode }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao adicionar rastreamento");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao adicionar rastreamento:", error.message);
        return null;
    }
}

export async function getTrackingByOrder(orderId, token) {
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
            throw new Error(errorData.error || "Erro ao buscar histórico de rastreamento");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar histórico de rastreamento:", error.message);
        return null;
    }
}

export async function getLatestTrackingStatus(orderId, token) {
    try {
        if (!token) throw new Error("Usuário não autenticado!");

        const response = await fetch(`${base_URL}/order/${orderId}/latest`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao buscar última atualização de rastreamento");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar última atualização de rastreamento:", error.message);
        return null;
    }
}
