"use client";

import { useState } from "react";
import { Box, Button, Text, HStack, VStack, Heading } from "@chakra-ui/react";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
};

const OrderDisplay: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: 1, name: "Orange Chicken", quantity: 1 },
    { id: 2, name: "Kung Pao Chicken", quantity: 2 },
  ]);

  const addItem = (id: number) => {
    setOrderItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const subtractItem = (id: number) => {
    setOrderItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      width="100%"
      maxW="400px"
      mx="auto"
      my="4"
    >
      <Heading as="h3" size="lg" mb={4} textAlign="center">
        Current Order
      </Heading>
      <VStack spacing={4} align="stretch">
        {orderItems.map((item) => (
          <Box key={item.id} p={3} borderWidth="1px" borderRadius="md">
            <HStack justify="space-between">
              <Text fontWeight="bold">{item.name}</Text>
              <HStack>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => subtractItem(item.id)}
                >
                  -
                </Button>
                <Text>{item.quantity}</Text>
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={() => addItem(item.id)}
                >
                  +
                </Button>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default OrderDisplay;
