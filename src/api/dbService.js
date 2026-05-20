const API_URL = "http://localhost:3001";

export const api = {
  // --- PRODUCTS ---
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  // --- CATEGORIES ---
  getCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // --- PRODUCT CRUD ---
  createProduct: async (productData) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productData,
          price: Number(productData.price),
          id: `prod-${Date.now()}`
        })
      });
      if (!response.ok) throw new Error("Failed to create product");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productData,
          price: Number(productData.price)
        })
      });
      if (!response.ok) throw new Error("Failed to update product");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error("Failed to delete product");
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // --- USERS ---
  loginUser: async (email, password) => {
    try {
      // JSON server supports query parameters for filtering
      const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (!response.ok) throw new Error("Login request failed");
      const users = await response.json();
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  registerUser: async (userData) => {
    try {
      // Check if user already exists
      const checkRes = await fetch(`${API_URL}/users?email=${encodeURIComponent(userData.email)}`);
      const existing = await checkRes.json();
      if (existing.length > 0) {
        throw new Error("Email is already registered");
      }

      // Create new user
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          role: 'user', // Default role
          id: `u${Date.now()}` // Generate simple ID
        })
      });

      if (!response.ok) throw new Error("Registration failed");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
