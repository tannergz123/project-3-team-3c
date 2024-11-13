"use client";

import { Box, Table, Tbody, Tr, Td, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';

const MenuManagement = () => {
  const initialMenuItems = [
    { name: 'Chicken Egg Roll', units: 35 },
    { name: 'Cream Cheese Rangoon', units: 28 },
    { name: 'Chow Mein', units: 42 },
    { name: 'Fried Rice', units: 22 },
    { name: 'Steamed White Rice', units: 18 },
    { name: 'Super Greens', units: 25 },
    { name: 'Hot Ones Blazing Bourbon Chicken', units: 15 },
    { name: 'Orange Chicken', units: 55 },
    { name: 'Grilled Teriyaki Chicken', units: 60 },
    { name: 'Kung Pao Chicken', units: 10 },
    { name: 'Honey Sesame Chicken Breast', units: 30 },
    { name: 'Mushroom Chicken', units: 48 },
    { name: 'Sweetfire Chicken Breast', units: 20 },
    { name: 'Black Pepper Chicken', units: 40 },
    { name: 'String Bean Chicken Breast', units: 16 },
    { name: 'Honey Walnut Shrimp', units: 12 },
    { name: 'Beijing Beef', units: 27 },
    { name: 'Broccoli Beef', units: 32 },
    { name: 'Black Pepper Sirloin Steak', units: 19 },
  ];

  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const getColor = (units) => {
    return units < 20 ? 'red.300' : 'green.300';
  };

  const handleCookMore = (index) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item, idx) =>
        idx === index ? { ...item, units: item.units + 50 } : item
      )
    );
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} maxH="500px" overflowY="auto">
      <Heading as="h2" size="md" mb={4}>
        Menu Management
      </Heading>

      <Table variant="simple">
        <Tbody>
          {menuItems.map((item, index) => (
            <Tr key={index}>
              <Td width="60%">{item.name}</Td>
              <Td width="20%" bg={getColor(item.units)} borderRadius="md" textAlign="center">
                {item.units}
              </Td>
              <Td width="20%">
                <Button size="sm" colorScheme="orange" onClick={() => handleCookMore(index)}>
                  Cook More
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MenuManagement;