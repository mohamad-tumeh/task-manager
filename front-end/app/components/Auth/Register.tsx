import React, { useState } from "react";
import { TextInput, PasswordInput, Button, Stack, Paper, Container, Text, Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import { RegisterData } from "~/types/apiTypes";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const { handleRegister } = useAuth(); // Use handleRegister from context
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await handleRegister(formData);
      navigate("/login");  // Redirect to the login page after successful registration.
    } catch (error) {
      console.error("Registration Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor href="/login" size="sm" weight={500}>
          Log in here
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="Name"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
              size="md"
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              size="md"
            />
            <TextInput
              label="Username"
              name="username"
              placeholder="Enter your username"
              required
              value={formData.username}
              onChange={handleChange}
              size="md"
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              size="md"
            />
            <PasswordInput
              label="Confirm Password"
              name="password_confirmation"
              placeholder="Re-enter your password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              size="md"
            />
          </Stack>

          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            color="blue"
            loading={loading}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
