// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import AuthProvider from './context/AuthContext';
import AppBar from './components/AppBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const [clientQueryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>

        <MantineProvider>
          <QueryClientProvider client={clientQueryClient}>
            <AuthProvider>
              {/* <TaskProvider> */}
              {children}
              {/* </TaskProvider> */}
            </AuthProvider>
          </QueryClientProvider>
        </MantineProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}