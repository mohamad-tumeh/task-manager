import React, { useState } from 'react';
import { Card, Button, TextInput, Loader, Alert } from '@mantine/core';
import { useTaskLists } from '~/hooks/useTaskLists';

export default function TaskList() {
  const { taskLists, loading, error, addTaskList, removeTaskList } = useTaskLists();
  const [title, setTitle] = useState('');

  // Handle adding a new task list
  const handleAddTaskList = () => {
    if (title.trim()) {
      addTaskList(title);
      setTitle(''); // Clear the input after adding
    }
  };

  return (
    <div>
      <h1>Task Lists</h1>

      {/* Loading Indicator */}
      {loading && <Loader size="md" />}

      {/* Error Alert */}
      {error && <Alert color="red">{error}</Alert>}

      {/* Input for adding new task list */}
      <TextInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task list title"
      />
      <Button onClick={handleAddTaskList} mt="sm">
        Add Task List
      </Button>

      {/* Display the task lists */}
      <div>
        {taskLists.map((list) => (
          <Card key={list.id} shadow="sm" mt="lg">
            <h3>{list.title}</h3>
            <Button color="red" onClick={() => removeTaskList(list.id)}>
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
