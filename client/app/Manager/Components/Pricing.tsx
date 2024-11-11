"use client";

import { Box, Table, Tbody, Tr, Td, Heading, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

const Pricing = () => {
  const initialPrices = [
    { name: 'A La Carte', price: 4.40 },
    { name: 'Bowl', price: 6.60 },
    { name: 'Plate', price: 8.80 },
    { name: 'Bigger Plate', price: 12.10 },
    { name: 'Appetizer/Side', price: 2.00 },
    { name: 'Drink', price: 2.00 },
  ];

  const [prices, setPrices] = useState(initialPrices);
  const [isEditing, setIsEditing] = useState(null);

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleSave = () => {
    setIsEditing(null);
  };

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setPrices((prevPrices) =>
      prevPrices.map((item, idx) =>
        idx === index ? { ...item, price: parseFloat(value) } : item
      )
    );
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Pricing
      </Heading>

      <Table variant="simple">
        <Tbody>
          {prices.map((item, index) => (
            <Tr key={index}>
              <Td width="60%">{item.name}</Td>
              <Td width="20%">
                {isEditing === index ? (
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(event) => handleInputChange(event, index)}
                    onBlur={handleSave}
                    autoFocus
                  />
                ) : (
                  `$${item.price.toFixed(2)}`
                )}
              </Td>
              <Td width="20%">
                {isEditing === index ? (
                  <Button size="sm" colorScheme="green" onClick={handleSave}>
                    Save
                  </Button>
                ) : (
                  <Button size="sm" colorScheme="blue" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Pricing;