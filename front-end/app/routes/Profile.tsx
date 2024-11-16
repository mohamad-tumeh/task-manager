import React, { useState } from "react";
import {
  TextInput,
  Button,
  Container,
  Center,
  Paper,
  Text,
  Divider,
  Stack,
  Group,
} from "@mantine/core";
import { useAuth } from "~/context/AuthContext";

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    createdAt: user?.created_at || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      console.error("Name and email cannot be empty.");
      return;
    }
    try {
      await updateUserProfile(formData);
      console.log("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!user) {
    return (
      <Center style={{ height: "100vh" }}>
        <Text size="xl" weight={500}>
          Loading Profile...
        </Text>
      </Center>
    );
  }

  return (
    <Container size={500} style={{ marginTop: "3rem" }}>
      <Paper radius="md" withBorder shadow="md" p="lg" style={{ backgroundColor: "#f8f9fa" }}>
        <Stack spacing="lg" mt="md">
          <Text size="xl" weight={700} align="center">
            {isEditing ? "Edit Profile" : formData.name}
          </Text>
          <Divider />

          <Stack spacing="sm">
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <TextInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <TextInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <TextInput
              label="Joined Date"
              name="createdAt"
              value={formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : "N/A"}
              disabled
            />
          </Stack>

          <Group position="center" mt="lg">
            {isEditing ? (
              <>
                <Button variant="outline" color="gray" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" gradient={{ from: "teal", to: "lime" }} onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                radius="md"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
