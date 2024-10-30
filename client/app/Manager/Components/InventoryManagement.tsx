import { Box, Table, Tbody, Tr, Td, Text, Heading } from '@chakra-ui/react';

const InventoryManagement = () => {
  const items = [
    { name: 'Oil', quantity: 237, color: 'green.300' },
    { name: 'Chicken', quantity: 17, color: 'red.300' },
    { name: 'Pork', quantity: 121, color: 'green.300' },
    { name: 'Beef', quantity: 19, color: 'red.300' },
    { name: 'Sweet and So..', quantity: 167, color: 'green.300' },
    { name: 'Salt', quantity: 76, color: 'yellow.300' },
    { name: 'Pepper', quantity: 121, color: 'green.300' },
  ];

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Inventory Management
      </Heading>
      <Table variant="simple">
        <Tbody>
          {items.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td bg={item.color} borderRadius="md" textAlign="center">
                {item.quantity}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryManagement;
