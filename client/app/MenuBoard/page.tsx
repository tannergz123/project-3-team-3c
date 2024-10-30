// MenuBoard.tsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  VStack,
  SimpleGrid,
  Divider
} from "@chakra-ui/react";

// Types for menu items
type MenuItem = {
  name: string;
  image: string; // URL to image
};

type ComboOption = {
  name: string;
  price: number;
  details: string;
};

// Combo options data
const combos: ComboOption[] = [
  { name: "1-Entrée Combo", price: 7.99, details: "Includes 1 entrée and 1 side" },
  { name: "2-Entrée Combo", price: 9.99, details: "Includes 2 entrées and 1 side" },
  { name: "3-Entrée Combo", price: 11.99, details: "Includes 3 entrées and 1 side" }
];

// Sides data
const sides: MenuItem[] = [
  { name: "Chow Mein", image: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Sides_ChowMein.png" },
  { name: "Fried Rice", image: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Sides_FriedRice.png" },
  { name: "White Steamed Rice", image: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Sides_WhiteSteamedRice.png" },
  { name: "Super Greens", image: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Vegetables_SuperGreens.png" }
];

// Entrees data
const entrees: MenuItem[] = [
  { name: "Orange Chicken", image: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Chicken_OrangeChicken.png" },
  { name: "Beijing Beef", image: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_BeijingBeef.png" },
  { name: "Broccoli Beef", image: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Beef_BroccoliBeef.png" },
  { name: "Honey Walnut Shrimp", image: "https://nomnom-files.pandaexpress.com/global/assets/modifiers/Seafood_HoneyWalnutShrimp.png" }
];

// Main MenuBoard Component
const MenuBoard: React.FC = () => {
  return (
    <Box p={6} maxW="2000em" mx="auto">
      {/* Combos Section */}
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Combo Options
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={10}>
        {combos.map((combo, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <Heading as="h3" size="md" mb={2}>
              {combo.name}
            </Heading>
            <Text fontSize="lg" color="gray.600">
              ${combo.price.toFixed(2)}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {combo.details}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Divider my={10} />

      {/* Sides Section */}
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Sides
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} mb={10}>
        {sides.map((side, index) => (
          <GridItem key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <VStack spacing={3}>
              <Image width="300px" height="200px" src={side.image} alt={side.name} borderRadius="md" />
              <Text fontWeight="bold">{side.name}</Text>
            </VStack>
          </GridItem>
        ))}
      </Grid>

      <Divider my={10} />

      {/* Entrees Section */}
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Entrees
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        {entrees.map((entree, index) => (
          <GridItem key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <VStack spacing={3}>
              <Image width="300px" height="200px" src={entree.image} alt={entree.name} borderRadius="md" />
              <Text fontWeight="bold">{entree.name}</Text>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default MenuBoard;