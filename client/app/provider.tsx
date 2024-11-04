// app/provider.tsx

"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
export const colors = {
  pandaRed: "#C8102E",
  pandaWhhite: "#FFFFFF",
  pandaBlack: "#000000",
  pandaGreen: "#7F9C6C",
  pandaBrown: "#A67C52",
  pandaOrange: "#d82c2c",
};
// Optionally, create a custom theme if needed
const theme = extendTheme({
  colors,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
