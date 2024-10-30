import { Box, Table, Tbody, Tr, Td, Text, Heading } from '@chakra-ui/react';

const MenuManagement = () => {
  const menuItems = [
    { name: 'Bowl', price: '$6.60' },
    { name: 'Plate', price: '$8.80' },
    { name: 'Bigger Plate', price: '$12.10' },
    { name: 'A La Carte', price: '$4.40' },
    { name: 'Drink', price: '$2.00' },
    { name: 'Side', price: '$2.00' },
  ];

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Menu Management
      </Heading>
      <Table variant="simple">
        <Tbody>
          {menuItems.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MenuManagement;
