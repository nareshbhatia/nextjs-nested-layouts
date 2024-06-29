'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a react-query client
const queryClient = new QueryClient();

export interface AppProviderProps {
  children?: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
