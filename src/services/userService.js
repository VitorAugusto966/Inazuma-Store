const base_URL = "http://localhost:3001/api/";

export async function login(email, senha) {
    try {
        const response = await fetch(`${base_URL}login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            throw new Error("Erro ao efetuar login");
        }

        const data = await response.json();
        console.log(data)
        return data.user;
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
}

export async function getUserData(userId) {
    try {
        const response = await fetch(`${base_URL}users/${userId}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar usuário");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null;
    }
}


export async function register(nome_social, nome_usuario, email, data_nascimento, senha) {
    try {
        const response = await fetch(`${base_URL}users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_social, nome_usuario, email, data_nascimento, senha })
        });

        if (!response.ok) {
            throw new Error("Erro ao registrar usuário");
        }

        const data = await response.json();
        console.log("Usuário registrado:", data);
        return data.user;
    } catch (error) {
        console.error("Erro ao registrar:", error);
        return null;
    }
}

export async function atualizarUser(id, updatedFields) {
    try {
        const response = await fetch(`${base_URL}users/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields)
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar usuário");
        }

        const data = await response.json();
        console.log("Usuário atualizado:", data);
        return data.user;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return null;
    }
}

export async function createAddress(userId, rua, numero, bairro, cidade, estado, cep) {
    try {
        const response = await fetch(`${base_URL}address/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rua, numero, bairro, cidade, estado, cep })
        });

        if (!response.ok) {
            throw new Error("Erro ao criar endereço");
        }

        const data = await response.json();
        console.log("Endereço criado:", data);
        return data;
    } catch (error) {
        console.error("Erro ao criar endereço:", error);
        return null;
    }
}

export async function atualizarAddress(id, updatedFields) {
    try {
        const response = await fetch(`${base_URL}address/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFields)
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar endereço");
        }

        const data = await response.json();
        console.log("Endereço atualizado:", data);
        return data.user;
    } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        return null;
    }
}

export async function getEndereco(userId) {
    try {
        const response = await fetch(`${base_URL}address/${userId}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar usuário");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null;
    }

}

export async function resetPassword(email) {
    try {
        const response = await fetch(`${base_URL}users/reset-password`, {
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