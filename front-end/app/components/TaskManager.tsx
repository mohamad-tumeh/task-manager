import React, { useState } from "react";
import { Card, Text, Button, TextInput, Group, Checkbox, Loader, Alert } from "@mantine/core";
import { useTasks } from "~/hooks/useTasks";

interface TaskManagerProps {
  taskListId: number;
}

const TaskManager: React.FC<TaskManagerProps> = ({ taskListId }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { tasks, loading, error, addTask, removeTask, toggleCompletion } = useTasks(taskListId);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  if (loading) return <Loader />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <Card>
      <Text weight={500} size="lg" mb="md">
        Tasks
      </Text>
      <Group mb="md">
        <TextInput
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task Title"
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </Group>
      {tasks.map((task) => (
        <Group key={task.id} position="apart" mb="xs">
          <Group>
            <Checkbox
              checked={task.is_completed}
              onChange={() => toggleCompletion(task.id, !task.is_completed)}
            />
            <Text>{task.title}</Text>
          </Group>
          <Button color="red" onClick={() => removeTask(task.id)}>
            Delete
          </Button>
        </Group>
      ))}
    </Card>
  );
};

export default TaskManager;
