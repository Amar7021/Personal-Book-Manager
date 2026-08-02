"use client";

import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default Providers;
