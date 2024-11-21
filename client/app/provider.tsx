"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store"; // Adjust the path based on your project structure

export const colors = {
  pandaRed: "#C8102E",
  pandaWhite: "#FFFFFF",
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
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </ReduxProvider>
  );
}
