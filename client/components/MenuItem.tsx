// components/MenuItem.tsx
import React from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";

// Define the props type for MenuItem
interface MenuItemProps {
  name: string;
  price: number;
  description?: string;
  onAddToOrder: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price, description, onAddToOrder }) => {
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

        {/* Description */}
        {description && (
          <Text fontSize="md" color="gray.500">
            {description}
          </Text>
        )}

        {/* Price */}
        <Text fontSize="lg" color="orange.500">
          ${price.toFixed(2)}
        </Text>

        {/* Button to add to order */}
        <Button 
          colorScheme="orange" 
          variant="solid" 
          onClick={onAddToOrder}
        >
          Add to Order
        </Button>
      </VStack>
    </Box>
  );
};

export default MenuItem;
