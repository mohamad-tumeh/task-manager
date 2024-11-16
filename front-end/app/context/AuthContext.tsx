import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { login, register, getUserProfile, updateUser } from "~/services/apiService";
import { UserProfile, RegisterData } from "~/types/apiTypes";

interface AuthContextType {
    user: UserProfile | null;
    handleLogin: (email: string, password: string) => Promise<void>;
    handleRegister: (formData: RegisterData) => Promise<void>;
    fetchUserProfile: () => Promise<void>;
    updateUserProfile: (updatedData: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await login({ email, password });
            const token = response.token;
            setUser(response.user);

            Cookies.set("token", token, { secure: true, sameSite: "strict" });
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    };

    const handleRegister = async (formData: RegisterData) => {
        try {
            await register(formData);
        } catch (error) {
            console.error("Registration failed:", error);
            throw new Error("Registration failed");
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await getUserProfile();
            setUser(response.user);
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            setUser(null);
            Cookies.remove("token");
        }
    };

    const updateUserProfile = async (updatedData: Partial<UserProfile>) => {
        try {
            const response = await updateUser(updatedData);
            setUser((prevUser) => ({
                ...prevUser!,
                ...response.user,
            }));
            return response;
        } catch (error) {
            console.error("Failed to update user profile:", error);
            throw new Error("Update failed");
        }
    };

    useEffect(() => {
        const token = Cookies.get("token");
        if (token && !user) {
            fetchUserProfile();
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegister, fetchUserProfile, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
