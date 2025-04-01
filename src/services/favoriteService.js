const base_URL = "http://localhost:3001/api/";

export async function getFavoritos(userId) {
    try {
        const response = await fetch(`${base_URL}favorites/${userId}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar favoritos");
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        return null;
    }
}

export async function favoritar(idUser, idProduto) {
    try {
        const response = await fetch(`${base_URL}favorites/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({idUser, idProduto })
        });

        if (!response.ok) {
            throw new Error("Erro ao registrar favorito");
        }

        const data = await response.json();
        console.log("Favoritado:", data);
        return data
    } catch (error) {
        console.error("Erro ao favoritar:", error);
        return null;
    }
}

export async function excluir(idUser, idProduto) {
    try {
        const response = await fetch(`${base_URL}favorites/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idUser, idProduto: idProduto }), 
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir favorito: ${response.statusText}`);
        }

        let data = null;
        if (response.headers.get("content-type")?.includes("application/json")) {
            data = await response.json();
        }

        console.log("Produto removido dos favoritos:", data);
        return data;
    } catch (error) {
        console.error("Erro ao excluir favorito:", error);
        return null;
    }
}
