import React from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { Box, Container, Group, Menu, Button, Text } from '@mantine/core';

export default function AppBar() {
  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundColor: '#1a73e8',
        padding: '10px',
      }}
    >
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* عنوان التطبيق */}
        <Text size="xl" weight={700} style={{ color: 'white' }}>
          Task Manager
        </Text>

        {/* روابط التنقل */}
        <Group spacing="lg">
          {/* الصفحة الرئيسية */}
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
          
          {/* إضافة قائمة مهام جديدة */}
          <Link to="/tasklist/new" style={{ textDecoration: 'none', color: 'white' }}>Add Task List</Link>
          
          {/* عرض القوائم المشتركة */}
          <Link to="/shared" style={{ textDecoration: 'none', color: 'white' }}>Shared Lists</Link>

          {/* قائمة منسدلة لإدارة المهام */}
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="outline" style={{ color: 'white', borderColor: 'white' }}>Manage</Button>
            </Menu.Target>
            <Menu.Dropdown>
              {/* روابط لإدارة القوائم والمهام */}
              <Menu.Item onClick={() => navigate('/tasklist/manage')}>Manage Task Lists</Menu.Item>
              <Menu.Item onClick={() => navigate('/shared')}>Manage Shared Lists</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </Box>
  );
}
