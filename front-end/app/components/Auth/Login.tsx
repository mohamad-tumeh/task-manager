import React, { useState } from "react";
import { TextInput, PasswordInput, Button, Stack, Paper, Container, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import { LoginData } from "~/types/apiTypes";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // تأكد من منع السلوك الافتراضي للنموذج
    setLoading(true);
    try {
      await handleLogin(formData.email, formData.password); // تنفيذ عملية تسجيل الدخول
      navigate("/profile"); // التنقل إلى صفحة البروفايل
    } catch (error) {
      console.error("Login Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Don&apos;t have an account?{" "}
        <Text
          component="span"
          color="blue"
          style={{ cursor: "pointer", fontWeight: 500 }}
          onClick={() => navigate("/register")} 
        >
          Sign up here
        </Text>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
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
          </Stack>

          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            color="blue"
            loading={loading}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
