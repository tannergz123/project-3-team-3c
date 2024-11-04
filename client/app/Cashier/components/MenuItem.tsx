// components/MenuItem.tsx
import React from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";

interface MenuItemProps {
  name: string;
  itemType: string;
  onAddToOrder: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, itemType, onAddToOrder }) => {
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      p="4" 
      shadow="md"
      width="250px"
      textAlign="center"
    >
      <VStack spacing="3">
        {/* Item Name */}
        <Text fontSize="xl" fontWeight="bold">
          {name}
        </Text>
        {/* Button to add to order */}
        <Button
          colorScheme="red"
          bg="pandaRed"
          color="white"
          _hover={{ bg: "pandaBrown" }}
          onClick={onAddToOrder}
        >
          Add to Order
        </Button>
      </VStack>
    </Box>
  );
};

export default MenuItem;
