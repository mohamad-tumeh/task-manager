import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTaskLists, createTaskList, updateTaskList, deleteTaskList } from '~/services/taskListService';

export const useTaskLists = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['taskLists'],
    queryFn: fetchTaskLists,
  });

  const taskLists = data?.data || [];

  const addTaskList = useMutation({
    mutationFn: createTaskList,
    onSuccess: () => queryClient.invalidateQueries(['taskLists']),
  });

  const editTaskList = useMutation({
    mutationFn: updateTaskList,
    onSuccess: () => queryClient.invalidateQueries(['taskLists']),
  });

  const removeTaskList = useMutation({
    mutationFn: deleteTaskList,
    onSuccess: () => queryClient.invalidateQueries(['taskLists']),
  });

  return { taskLists, isLoading, error, addTaskList, editTaskList, removeTaskList };
};
