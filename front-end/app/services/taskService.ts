import apiClient from '~/utils/apiClient';
import { Task, ApiResponse } from '~/types/apiTypes';

export const fetchTasks = async (taskListId: number): Promise<ApiResponse<Task[]>> => {
  const response = await apiClient.get(`/tasks/${taskListId}`);
  return response.data;
};

export const createTask = async (taskListId: number, title: string): Promise<ApiResponse<Task>> => {
    const response = await apiClient.post('/tasks', { task_list_id: taskListId, title });
    return response.data;
  };

export const updateTask = async (taskId: number, title: string): Promise<ApiResponse<Task>> => {
  const response = await apiClient.put(`/tasks/${taskId}`, { title });
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete(`/tasks/${taskId}`);
  return response.data;
};

export const toggleTaskCompletion = async (taskId: number, completed: boolean): Promise<ApiResponse<Task>> => {
  const response = await apiClient.put(`/tasks/${taskId}/${completed ? 'complete' : 'incomplete'}`);
  return response.data;
};
