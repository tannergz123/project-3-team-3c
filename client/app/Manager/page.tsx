import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import EmployeeManagement from './Components/EmployeeManagement';
import Analytics from './Components/Analytics';
import InventoryManagement from './Components/InventoryManagement';
import MenuManagement from './Components/MenuManagement';
import Inquiries from './Components/Inquiries';
import BackButton from '../../components/BackButton';
import Pricing from './Components/Pricing'

const ManagerViewPage = () => {
  return (
    <Box p={8} textAlign="center">
      <Heading as="h1" size="lg" mb={8}>
        Panda Express Manager
      </Heading>
      <Box position="absolute" top="10px" left="10px">
        <BackButton />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        <MenuManagement />
        <Analytics />
        <InventoryManagement />
        <EmployeeManagement />
        <Inquiries />
        <Pricing />
      </SimpleGrid>
    </Box>
  );
};

export default ManagerViewPage;