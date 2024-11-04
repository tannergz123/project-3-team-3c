import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

interface TypeSelectorProps {
  type: string;
  setType: (type: string) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ type, setType }) => {
  const types = ["Appetizer", "Bowl", "Plate", "Bigger Plate", "A La Carte", "Drink"];

  return (
    <HStack spacing={4} justify="center" mb={5}>
      {types.map((t) => (
        <Button
          key={t}
          colorScheme={t === type ? "red" : "gray"}
          onClick={() => setType(t)}
        >
          {t}
        </Button>
      ))}
    </HStack>
  );
};

export default TypeSelector;
