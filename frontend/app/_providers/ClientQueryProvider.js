"use client";
import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "react-query";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }) => {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
};

export default QueryClientProvider;
