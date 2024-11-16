import { createReactRouter, createRouteConfig } from '@tanstack/router';
import Home from './routes/index';
import SharedLists from './routes/shared';

const routeConfig = createRouteConfig().addChildren([
  { path: '/', element: <Home /> },
  { path: '/tasklist/:taskListId', element: <TaskListDetail /> },
  { path: '/shared', element: <SharedLists /> },
]);

export const router = createReactRouter({ routeConfig });
