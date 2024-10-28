// app/provider.tsx

"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Optionally, create a custom theme if needed
const theme = extendTheme({
  // Customize your theme settings here if needed
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
