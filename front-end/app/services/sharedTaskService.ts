import apiClient from '~/utils/apiClient';
import { SharedTask, ApiResponse } from '~/types/apiTypes';

export const fetchSharedTaskLists = async (): Promise<ApiResponse<SharedTask[]>> => {
  const response = await apiClient.get('/sharing/shared');
  return response.data;
};


export const shareTaskList = async (taskListId: number, username: string, permission: 'view' | 'edit'): Promise<ApiResponse<SharedTask>> => {
  const response = await apiClient.post(`/sharing/tasklist/${taskListId}`, { username, permission });
  return response.data;
};

export const revokeAccess = async (taskListId: number, userId: number): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete(`/sharing/tasklist/${taskListId}/${userId}`);
  return response.data;
};

export const getUsers = async () => {
    const response = await apiClient.get(`/users`);
    return response.data;
  };

