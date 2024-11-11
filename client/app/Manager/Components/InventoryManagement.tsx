"use client";

import { Box, Table, Tbody, Tr, Td, Text, Heading, Button, HStack } from '@chakra-ui/react';
import { useState } from 'react';

const InventoryManagement = () => {
  const initialItems = [
    { name: 'Beef', quantity: 19 },
    { name: 'Broccoli', quantity: 237 },
    { name: 'Chicken', quantity: 17 },
    { name: 'Cream Cheese', quantity: 121 },
    { name: 'Flour', quantity: 76 },
    { name: 'Hot Sauce', quantity: 45 },
    { name: 'Kung Pao Sauce', quantity: 29 },
    { name: 'Noodles', quantity: 167 },
    { name: 'Oil', quantity: 200 },
    { name: 'Pineapple', quantity: 15 },
    { name: 'Rice', quantity: 320 },
    { name: 'Savory Sauce', quantity: 60 },
    { name: 'Shrimp', quantity: 12 },
    { name: 'Sweet Sauce', quantity: 50 },
    { name: 'Sweet and Sour Sauce', quantity: 45 },
    { name: 'Teriyaki Sauce', quantity: 89 },
    { name: 'Veggie Mix', quantity: 132 },
  ];

  const [items, setItems] = useState(
    initialItems.map(item => ({ ...item, orderQuantity: 0 }))
  );

  const getColor = (quantity) => {
    if (quantity > 150) return 'green.300';
    if (quantity >= 30 && quantity <= 50) return 'yellow.300';
    if (quantity < 20) return 'red.300';
    return 'gray.200';
  };

  const handleIncrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, orderQuantity: item.orderQuantity + 50 } : item
      )
    );
  };

  const handleDecrement = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, orderQuantity: Math.max(0, item.orderQuantity - 50) } : item
      )
    );
  };

  const handlePlaceOrder = () => {
    const updatedItems = items.map(item => ({
      ...item,
      quantity: item.quantity + item.orderQuantity,
      orderQuantity: 0
    }));

    setItems(updatedItems);
    alert("Order placed and inventory updated!");
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} maxH="500px" overflowY="auto">
      <Heading as="h2" size="md" mb={4}>
        Inventory Management
      </Heading>
      
      <Button size="md" colorScheme="orange" mb={4} onClick={handlePlaceOrder}>
        Place Order
      </Button>

      <Table variant="simple">
        <Tbody>
          {items.map((item, index) => (
            <Tr key={index}>
              <Td width="40%">{item.name}</Td>
              <Td width="20%" bg={getColor(item.quantity)} borderRadius="md" textAlign="center">
                {item.quantity}
              </Td>
              <Td width="40%">
                <HStack spacing={2}>
                  <Button size="sm" onClick={() => handleDecrement(index)}>-</Button>
                  <Text>{item.orderQuantity}</Text>
                  <Button size="sm" onClick={() => handleIncrement(index)}>+</Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryManagement;