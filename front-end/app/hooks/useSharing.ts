import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '~/utils/apiClient';

const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const useSharing = () => {
  const queryClient = useQueryClient();

  const { data: sharedLists, isLoading: isLoadingSharedLists, error: sharedListsError } = useQuery({
    queryKey: ['sharedLists'],
    queryFn: async () => {
      const response = await apiClient.get('/sharing/shared');
      return response.data.data;
    },
  });

  const { data: users, isLoading: isLoadingUsers, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const shareTaskList = useMutation({
    mutationFn: async (data: { task_list_id: number; user_id: number; permission: 'view' | 'edit' }) => {
      const response = await apiClient.post(`/sharing/tasklist/${data.task_list_id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sharedLists'] });
    },
  });

  const revokeAccess = useMutation({
    mutationFn: async ({ taskListId, userId }: { taskListId: number; userId: number }) => {
      await apiClient.delete(`/sharing/tasklist/${taskListId}/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sharedLists'] });
    },
  });

  return {
    sharedLists,
    isLoadingSharedLists,
    sharedListsError,
    users,
    isLoadingUsers,
    usersError,
    shareTaskList,
    revokeAccess,
  };
};
