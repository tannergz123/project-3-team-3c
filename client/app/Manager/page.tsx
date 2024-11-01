import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import EmployeeManagement from './Components/EmployeeManagement';
import Analytics from './Components/Analytics';
import InventoryManagement from './Components/InventoryManagement';
import MenuManagement from './Components/MenuManagement';

const ManagerViewPage = () => {
  return (
    <Box p={8} textAlign="center">
      <Heading as="h1" size="lg" mb={8}>
        Panda Express Manager View
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <EmployeeManagement />
        <Analytics />
        <InventoryManagement />
        <MenuManagement />
      </SimpleGrid>
    </Box>
  );
};

export default ManagerViewPage;
