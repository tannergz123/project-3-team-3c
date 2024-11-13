// components/MenuItem.tsx
import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

interface MenuItemProps {
  name: string;
  itemType: string;
  onAddToOrder: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, onAddToOrder }) => {
  return (
    <Box
    >
      <Button
        width="100%"
        colorScheme="red"
        variant="outline"
        size="sm"
        onClick={onAddToOrder}
      >
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm" color="gray.600" ml={2}></Text>
      </Button>
    </Box>
  );
};

export default MenuItem;
