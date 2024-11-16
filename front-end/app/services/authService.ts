import apiClient from "~/utils/apiClient";

export const getUsers = async () => {
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users", error);
      throw error;
    }
  };

export async function loginUser(email: string, password: string) {
    const response = await apiClient.post("/login", { email, password });
    return response.data;
  }
  
  export async function registerUser(name: string, email: string, username: string, password: string) {
    const response = await apiClient.post("/register", { name, email, username, password });
    return response.data;
  }
  