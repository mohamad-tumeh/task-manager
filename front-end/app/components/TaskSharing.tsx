import React, { useState } from "react";
import { Card, Text, Button, TextInput, Select, Group, Loader, Alert } from "@mantine/core";
import { useSharedTasks } from "~/hooks/useSharing";

interface TaskSharingProps {
  taskListId: number;
}

const TaskSharing: React.FC<TaskSharingProps> = ({ taskListId }) => {
  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState<"view" | "edit">("view");
  const { sharedTasks, loading, error, addSharedTask, removeSharedTask } = useSharedTasks();

  const handleShare = () => {
    if (username.trim()) {
      addSharedTask(taskListId, username, permission);
      setUsername("");
      setPermission("view");
    }
  };

  if (loading) return <Loader />;
  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <Card>
      <Text weight={500} size="lg" mb="md">
        Share Task List
      </Text>
      <Group mb="md">
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Select
          value={permission}
          onChange={(value) => setPermission(value as "view" | "edit")}
          data={[
            { value: "view", label: "View Only" },
            { value: "edit", label: "Edit" },
          ]}
        />
        <Button onClick={handleShare}>Share</Button>
      </Group>
      {sharedTasks
        .filter((shared) => shared.taskListId === taskListId)
        .map((shared) => (
          <Group key={shared.userId} position="apart" mb="xs">
            <Text>
              {shared.username} ({shared.permission})
            </Text>
            <Button color="red" onClick={() => removeSharedTask(shared.taskListId, shared.userId)}>
              Remove
            </Button>
          </Group>
        ))}
    </Card>
  );
};

export default TaskSharing;
