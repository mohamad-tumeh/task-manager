
import apiClient from "~/utils/apiClient";
import { LoginData, RegisterData, Task, ApiResponse, SharedTaskList, UserProfile, CreateTaskData } from "~/types/apiTypes";

// User Management
export const register = async (userData: RegisterData): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.post<ApiResponse<UserProfile>>("/register", userData);
    return response.data;
};

export const login = async (credentials: LoginData): Promise<ApiResponse<{ token: string }>> => {
    const response = await apiClient.post<ApiResponse<{ token: string }>>("/login", credentials);
    return response.data;
};

export const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.get<ApiResponse<UserProfile>>("/profile");
    return response.data;
};

export const updateUser = async (data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.put<ApiResponse<UserProfile>>("/profile/update", data);
    return response.data;
};


// Task Management
export const fetchTasks = async (): Promise<ApiResponse<Task[]>> => {
    const response = await apiClient.get<ApiResponse<Task[]>>("/tasks");
    return response.data;
};

export const createTask = async (task: CreateTaskData): Promise<ApiResponse<Task>> => {
    const response = await apiClient.post<ApiResponse<Task>>("/tasks", task);
    return response.data;
};

export const updateTask = async (taskId: number, updatedTask: Partial<Task>): Promise<ApiResponse<Task>> => {
    const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${taskId}`, updatedTask);
    return response.data;
};

export const deleteTask = async (taskId: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/tasks/${taskId}`);
    return response.data;
};

// Sharing Functionality
export const shareTaskList = async (taskId: number, sharedWith: string, permission: "view" | "edit"): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>(`/tasks/${taskId}/share`, { sharedWith, permission });
    return response.data;
};

export const getSharedTasks = async (): Promise<ApiResponse<SharedTaskList[]>> => {
    const response = await apiClient.get<ApiResponse<SharedTaskList[]>>("/shared-tasks");
    return response.data;
};
