import React from "react";
import { Paper, Title, Container } from "@mantine/core";
import Register from "~/components/Auth/register";

const RegisterPage: React.FC = () => {
    return (
        <Container size="xs" my="md">
            <Paper shadow="xs" p="lg">
                <Title style={{ textAlign: "center", marginBottom: "16px" }}>Register</Title>
                <Register />
            </Paper>
        </Container>
    );
};

export default RegisterPage;
