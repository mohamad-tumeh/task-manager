import React from 'react';
import { Link } from '@remix-run/react';
import { useTaskLists } from '~/hooks/useTaskLists';
import { Card, Button, Loader, Alert } from '@mantine/core';

export default function Index() {
  const { taskLists, isLoading, error, removeTaskList } = useTaskLists();

  if (isLoading) return <Loader />;
  if (error) return <Alert color="red">{error.message}</Alert>;

  return (
    <div>
      <h1>Task Lists</h1>

      {taskLists.length === 0 && <p>No task lists found.</p>}

      {taskLists.map((list: any) => (
        <Card key={list.id} shadow="sm" mt="lg">
          <Link to={`/tasklist/${list.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>{list.title}</h3>
          </Link>
          <Button color="red" onClick={() => removeTaskList.mutate(list.id)}>Delete</Button>
        </Card>
      ))}
    </div>
  );
}
