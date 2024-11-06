import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

interface TypeSelectorProps {
  type: string;
  onTypeChange: (type: string) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ type, onTypeChange }) => {
  const types = ["Appetizer", "Bowl", "Plate", "Bigger Plate", "A La Carte", "Drink"];

  return (
    <HStack spacing={4} justify="center" mb={5}>
      {types.map((t) => (
        <Button
          key={t}
          colorScheme={t === type ? "red" : "gray"}
          onClick={() => onTypeChange(t)}
        >
          {t}
        </Button>
      ))}
    </HStack>
  );
};

export default TypeSelector;
