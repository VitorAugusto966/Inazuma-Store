const BASE_URL = "https://dummyjson.com/products";


export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}?limit=50`);
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar produto");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

export async function getProductsByCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}/category/${category}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos da categoria");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

export async function searchProducts(query) {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    return { products: [] };
  }
}