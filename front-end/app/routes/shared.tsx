import React, { useState } from 'react';
import { useSharing } from '~/hooks/useSharing';
import { useTaskLists } from '~/hooks/useTaskLists';
import { Card, Button, Select, Loader, Alert } from '@mantine/core';

export default function SharedTaskLists() {
  const { taskLists, isLoading: isLoadingTaskLists, error: taskListsError } = useTaskLists();
  const {
    sharedLists,
    isLoadingSharedLists,
    sharedListsError,
    users,
    isLoadingUsers,
    usersError,
    shareTaskList,
    revokeAccess,
  } = useSharing();

  const [selectedTaskListId, setSelectedTaskListId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [permission, setPermission] = useState<'view' | 'edit'>('view');

  const handleShare = async () => {
    if (selectedTaskListId && selectedUserId) {
      await shareTaskList.mutate({
        task_list_id: Number(selectedTaskListId),
        user_id: Number(selectedUserId),
        permission,
      });
      setSelectedTaskListId('');
      setSelectedUserId('');
    }
  };

  if (isLoadingTaskLists || isLoadingUsers || isLoadingSharedLists) {
    return <Loader />;
  }

  if (taskListsError || usersError || sharedListsError) {
    return (
      <Alert color="red">
        {taskListsError?.message || usersError?.message || sharedListsError?.message}
      </Alert>
    );
  }

  if (!taskLists.length || !users.length) {
    return <Alert color="yellow">No Task Lists or Users available</Alert>;
  }

  return (
    <div>
      <h1>Share Task Lists</h1>

      <Select
        value={selectedTaskListId}
        onChange={(value) => setSelectedTaskListId(value as string)}
        data={taskLists.map((taskList: { id: number; title: string }) => ({
          value: taskList.id.toString(),
          label: taskList.title,
        }))}
        placeholder="Select Task List"
        mb="md"
      />

      <Select
        value={selectedUserId}
        onChange={(value) => setSelectedUserId(value as string)}
        data={users.map((user: { id: number; name: string }) => ({
          value: user.id.toString(),
          label: user.name,
        }))}
        placeholder="Select User"
        mb="md"
      />

      <Select
        value={permission}
        onChange={(value) => setPermission(value as 'view' | 'edit')}
        data={[
          { value: 'view', label: 'View' },
          { value: 'edit', label: 'Edit' },
        ]}
        mb="md"
      />

      <Button onClick={handleShare} disabled={!selectedTaskListId || !selectedUserId} mb="lg">
        Share Task List
      </Button>

      {sharedLists?.map((list) => (
        <Card key={list.task_list_id} shadow="sm" mt="lg">
          <h3>Task List: {list.task_list_id}</h3>
          <p>Shared with User ID: {list.user_id}</p>
          <p>Permission: {list.permission}</p>
          <Button
            color="red"
            onClick={() =>
              revokeAccess.mutate({ taskListId: list.task_list_id, userId: list.user_id })
            }
          >
            Revoke Access
          </Button>
        </Card>
      ))}
    </div>
  );
}
