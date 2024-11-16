import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from '~/services/taskService';

export const useTasks = (taskListId: number | undefined) => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks', taskListId],
    queryFn: () => fetchTasks(taskListId!),
    enabled: !!taskListId, 
  });

  const addTask = useMutation({
    mutationFn: (title: string) => createTask(taskListId!, title),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', taskListId]);
    },
  });

  const editTask = useMutation({
    mutationFn: ({ taskId, title }: { taskId: number; title: string }) => updateTask(taskId, title),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', taskListId]);
    },
  });

  const removeTask = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', taskListId]);
    },
  });

  const toggleCompletion = useMutation({
    mutationFn: ({ taskId, completed }: { taskId: number; completed: boolean }) =>
      toggleTaskCompletion(taskId, completed),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', taskListId]);
    },
  });

  return {
    tasks: tasks || [],
    isLoading,
    error,
    addTask,
    editTask,
    removeTask,
    toggleCompletion,
  };
};
