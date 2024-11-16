import apiClient from '~/utils/apiClient';
import { TaskList, ApiResponse } from '~/types/apiTypes';

export const fetchTaskLists = async (): Promise<ApiResponse<TaskList[]>> => {
  const response = await apiClient.get('/tasklists');
  return response.data;
};

export const createTaskList = async (title: string): Promise<ApiResponse<TaskList>> => {
  const response = await apiClient.post('/tasklists', { title });
  return response.data;
};

export const updateTaskList = async (id: number, title: string): Promise<ApiResponse<TaskList>> => {
  const response = await apiClient.put(`/tasklists/${id}`, { title });
  return response.data;
};

export const deleteTaskList = async (id: number): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete(`/tasklists/${id}`);
  return response.data;
};
