"use client";
import { queryClient } from "@/lib/react-query/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export function ReactQueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
