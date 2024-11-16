import React from "react";
import { Paper, Title, Container, Text, Stack } from "@mantine/core";
import Login from "~/components/Auth/Login";

const LoginPage: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", 
        margin: 0,
        padding: 0,
      }}
    >
      <Container
        size="xs"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "95vh",
        }}
      >
        <Paper
          shadow="lg"
          radius="md"
          p="xl"
          style={{
            width: "100%",
            maxWidth: "400px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Stack spacing="md" align="center">
            <Title
              order={1}
              style={{
                fontWeight: 700,
                fontSize: "24px",
                color: "#2d3436",
                textAlign: "center",
              }}
            >
              Welcome Back!
            </Title>
            <Text
              size="sm"
              style={{
                color: "#636e72",
                textAlign: "center",
              }}
            >
              Please enter your credentials to log in
            </Text>
            <Login />
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
