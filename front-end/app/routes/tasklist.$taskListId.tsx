import React, { useState } from 'react';
import { useParams } from '@remix-run/react';
import { useTasks } from '~/hooks/useTasks';
import { Card, Button, TextInput, Checkbox, Loader, Alert } from '@mantine/core';

export default function TaskListDetail() {
  const { taskListId } = useParams();
  const numericTaskListId = Number(taskListId);
  const { tasks, isLoading, error, addTask, toggleCompletion, removeTask } = useTasks(numericTaskListId);
  const [title, setTitle] = useState('');

  return (
    <div>
      <h1>Manage Tasks for List {taskListId}</h1>
      {isLoading && <Loader />}
      {error && <Alert color="red">{error}</Alert>}

      <TextInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task"
      />
      <Button onClick={() => addTask.mutate(title)} disabled={!title.trim()}>Add Task</Button>

      {tasks?.map((task) => (
        <Card key={task.id}>
          <Checkbox
            checked={task.is_completed}
            onChange={() => toggleCompletion.mutate({ taskId: task.id, isCompleted: !task.is_completed })}
            label={task.title}
          />
          <Button color="red" onClick={() => removeTask.mutate(task.id)}>Delete</Button>
        </Card>
      ))}
    </div>
  );
}
