import React, { useState } from 'react';
import { useTasks } from '~/hooks/useTasks';
import { Card, Button, Checkbox, TextInput, Loader, Alert } from '@mantine/core';

interface TaskProps {
  taskListId: number;
}

export default function Task({ taskListId }: TaskProps) {
  const { tasks, loading, error, addTask, toggleCompletion, removeTask } = useTasks(taskListId);
  const [title, setTitle] = useState('');

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Alert color="red">{error}</Alert>}

      <TextInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <Button onClick={handleAddTask}>Add Task</Button>

      {tasks.map((task) => (
        <Card key={task.id} mt="lg">
          <Checkbox
            checked={task.completed}
            onChange={() => toggleCompletion(task.id, !task.completed)}
            label={task.title}
          />
          <Button color="red" onClick={() => removeTask(task.id)}>Delete</Button>
        </Card>
      ))}
    </div>
  );
}
