import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
} from "@chakra-ui/react";
import EmployeeManagement from "./Components/EmployeeManagement";
import Analytics from "./Components/Analytics";
import InventoryManagement from "./Components/InventoryManagement";
import MenuManagement from "./Components/MenuManagement";
import Insights from "./Components/Insights";
import BackButton from "../../components/BackButton";
import Pricing from "./Components/Pricing";

const ManagerViewPage = () => {
  return (
    <Box p={8} textAlign="center">
      <Heading as="h1" size="lg" mb={8}>
        Panda Express Manager
      </Heading>
      <Box position="absolute" top="10px" left="10px">
        <BackButton />
      </Box>
      <Tabs variant="enclosed" mt={4}>
        <TabList>
          <Tab>Menu & Pricing</Tab>
          <Tab>Employee & Inventory</Tab>
          <Tab>Analytics & Inquiries</Tab>
        </TabList>

        <TabPanels>
          {/* Tab 1: Menu & Pricing */}
          <TabPanel>
            <Grid
              templateColumns="2fr 1fr" // 2/3 and 1/3 ratio
              gap={8} // Space between columns
            >
              <Box height="900px" overflowY="auto">
                <MenuManagement />
              </Box>
              <Box height="900px" overflowY="auto">
                <Pricing />
              </Box>
            </Grid>
          </TabPanel>

          {/* Tab 2: Employee & Inventory */}
          <TabPanel>
            <Grid
              templateColumns="1fr 1fr" // Equal side-by-side columns
              gap={8} // Space between columns
            >
              <Box height="900px" overflowY="auto">
                <EmployeeManagement />
              </Box>
              <Box height="900px" overflowY="auto">
                <InventoryManagement />
              </Box>
            </Grid>
          </TabPanel>

          {/* Tab 3: Analytics & Inquiries */}
          <TabPanel>
            <Grid
              templateColumns="1fr 1fr" // Equal side-by-side columns
              gap={8} // Space between columns
            >
              <Box height="900px" overflowY="auto">
                <Analytics />
              </Box>
              <Box height="900px" overflowY="auto">
                <Insights />
              </Box>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ManagerViewPage;