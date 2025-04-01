const base_URL = "http://localhost:3001/api/";

export async function getCupons(userId, token) {
    try {
        const response = await fetch(`${base_URL}vouchers/user/${userId}`, {
            method: "GET", 
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar cupons");
        }
        
        const data = await response.json();
        console.log("Cupons do usuário:", data);
        return data;
    } catch (error) {
        console.error("Erro ao buscar cupons:", error);
        return null;
    }
}


export async function aplicarCupom(idUser, voucherName, token) {
    try {
        const response = await fetch(`${base_URL}vouchers/assign`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            body: JSON.stringify({ idUser, voucherName})
        });

        if (!response.ok) {
            throw new Error("Erro ao aplicar cupom");
        }

        const data = await response.json();
        console.log("Cupom aplicado:", data);
        return data;
    } catch (error) {
        console.error("Erro ao aplicar cupom:", error);
        return null;
    }
}

export async function usarCupom(idUser, idVoucher, token) {
    try {
        const response = await fetch(`${base_URL}vouchers/use`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token  },
            body: JSON.stringify({ idUser, idVoucher })
        });

        if (!response.ok) {
            throw new Error("Erro ao usar cupom");
        }

        const data = await response.json();
        console.log("Cupom utilizado:", data);
        return data;
    } catch (error) {
        console.error("Erro ao usar cupom:", error);
        return null;
    }
}

export async function deletarCupom(id, token) {
    try {
        const response = await fetch(`${base_URL}vouchers/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token}
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar cupom");
        }

        console.log("Cupom deletado com sucesso");
        return true;
    } catch (error) {
        console.error("Erro ao deletar cupom:", error);
        return false;
    }
}
