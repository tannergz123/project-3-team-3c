// MenuBoard.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  VStack,
  HStack,
  Spacer,
  SimpleGrid,
  Divider
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";

// axios 


// Types for menu items
type MenuItem = {
  name: string;
  calories?: string;
  protein?: string;
  type?: string;
  image?: string; // URL to image or StaticImageData
};

type ComboOption = {
  name: string;
  price: number;
  details: string;
};

// Menu options data
var combos: ComboOption[] = [
  { name: "Bowl", price: 7.99, details: "Includes 1 entrée and 1 side" },
  { name: "Plate", price: 9.99, details: "Includes 2 entrées and 1 side" },
  { name: "Bigger Plate", price: 11.99, details: "Includes 3 entrées and 1 side" },
  { name: "Appetizer", price: 3.50, details: "1 serving of appetizer"},
  { name: "a la Carte", price: 4.40, details: "1 serving of side or entrée"},
  { name: "Drink", price: 2.10, details: "" }
];

// Sides data
/* var sides: MenuItem[] = [
  { name: "Chow Mein", image: "/menu_images/side/chow_mein.png" },
  { name: "Fried Rice", image: "/menu_images/side/fried_rice.png" },
  { name: "White Steamed Rice", image: "/menu_images/side/white_rice.png" },
  { name: "Super Greens", image: "/menu_images/side/super_greens.png" }
]; */

// Entrees data
/* var entrees: MenuItem[] = [
  { name: "Orange Chicken", image: "/menu_images/entree/orange_chicken.png" },
  { name: "Beijing Beef", image: "/menu_images/entree/beijing_beef.png" },
  { name: "Broccoli Beef", image: "/menu_images/entree/broccoli_beef.png" },
  { name: "Honey Walnut Shrimp", image: "/menu_images/entree/hw_shrimp.png" },
  { name: "Honey Sesame Chicken Breast", image: "/menu_images/entree/honey_sesame.png" },
  { name: "Mushroom Chicken", image: "/menu_images/entree/mushroom_chicken.png" },
  { name: "SweetFire Chicken Breast", image: "/menu_images/entree/sf_chicken.png" },
  { name: "Teriyaki Chicken", image: "/menu_images/entree/teriyaki_chicken.png" },
  { name: "Kung Pao Chicken", image: "/menu_images/entree/kp_chicken.png" },
  { name: "Black Pepper Sirloin Steak", image: "/menu_images/entree/bp_steak.png" },
  { name: "Black Pepper Chicken", image: "/menu_images/entree/bp_chicken.png" },
  { name: "String Bean Chicken Breast", image: "/menu_images/entree/sb_chicken.png" }
]; */

// Appetizers data
/* var appetizers: MenuItem[] = [
  { name: "Chicken Egg Roll", image: "/menu_images/appetizer/chicken_egg_roll.avif" },
  { name: "Cream Cheese Rangoon", image: "/menu_images/appetizer/cream_cheese_rangoon.avif" },
  { name: "Apple Pie Roll", image: "/menu_images/appetizer/apple_pie_roll.avif" },
  { name: "Veggie Spring Roll", image: "/menu_images/appetizer/veggie_spring_roll.avif" }
] */

// Main MenuBoard Component
const MenuBoard: React.FC = () => {

  const [entrees, setEntrees] = useState<MenuItem[]>([]);
  const [sides, setSides] = useState<MenuItem[]>([]);
  const [appetizers, setAppetizers] = useState<MenuItem[]>([]);

useEffect(() => {
  // fetch
  axios
    .get('https://project-3-team-3c.onrender.com/items/get-all-items')
    .then((response) => {
      const items = response.data;

      // classify items into categories
      const entree_list: MenuItem[] = [];
      const side_list: MenuItem[] = [];
      const appetizer_list: MenuItem[] = [];

      items.forEach((item: any) => {

        const img_path = "/menu_images/" + item.item_name.split(' ').map(word => word.toLowerCase()).join('_') + ".png";

        const formattedItem = {
          name: item.item_name,
          calories: item.calories ? item.calories : 0,
          protein: item.protein ? item.protein : 0,
          type: item.item_type,
          image: img_path ? img_path: "/menu_images/no_image.png"
        };

        switch (item.item_type) {
          case "Entree":
            entree_list.push(formattedItem);
            break;
          
          case "Side":
            side_list.push(formattedItem);
            break;
          
          case "Appetizer":
            appetizer_list.push(formattedItem);
            break;
        }
      });

      // update state
      setEntrees(entree_list);
      setSides(side_list);
      setAppetizers(appetizer_list);

      console.log("Menu data fetched successfully");
      console.log(entrees);
      console.log(sides);
      console.log(appetizers);
    })
    .catch((error) => {
      console.error("Error fetching menu data:", error);
    });
}, []);

  return (
    
    <Box p={6} maxW="2000em" mx="auto">
      <Box position="absolute" top="10px" left="10px" borderRadius="md">
        <BackButton />
      </Box>
      {/* Combos Section */}
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Combo Options
      </Heading>
      <Box bg="red.600" borderRadius="md" p={4}>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {combos.map((combo, index) => (
            <Box key={index} p={4} borderWidth="4px" borderRadius="md" boxShadow="md" borderColor="gold" bg="white">
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
      </Box>

      <Divider my={5} />
      
      <Grid templateColumns="1.5fr 4fr" gap={6}>
        {/* Sides Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Sides
          </Heading>
          <Box p={4} borderRadius="md" bg="red.600">
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              {sides.map((side, index) => (
                <GridItem key={index} p={4} borderWidth="4px" borderRadius="md" boxShadow="md" borderColor="gold" bg="white">
                  <VStack spacing={3}>
                    <Image width="18.75em" height="12.5em" src={side.image} alt={side.name} borderRadius="md" />
                    <Text fontWeight="bold">{side.name}</Text>
                    <HStack width="100%">

                      <Spacer />
                      <Text>Calories: {side.calories} Protein: {side.protein}</Text>
                    </HStack>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Entrees Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Entrees
          </Heading>
          <Box p={4} borderRadius="md" bg="red.600">
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {entrees.map((entree, index) => (
                <GridItem key={index} p={4} borderWidth="4px" borderRadius="md" boxShadow="md" borderColor="gold" bg="white">
                  <VStack spacing={3}>
                    <Image width="18.75vh" height="12.5vh" src={entree.image} alt={entree.name} borderRadius="md" />
                    <Text fontWeight="bold">{entree.name}</Text>
                    <HStack width="100%">
                      
                      <Spacer />
                      <Text>Calories: {entree.calories} Protein: {entree.protein}</Text>
                    </HStack>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>

      <Divider my={10} />

      {/* Appetizer Section */}
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Appetizers
      </Heading>
      <Box p={4} borderRadius="md" bg="red.600">
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {appetizers.map((appetizer, index) => (
            <GridItem key={index} p={4} borderWidth="4px" borderRadius="md" boxShadow="md" borderColor="gold" bg="white">
              <VStack spacing={3}>
                <Image width="18.75em" height="12.5em" src={appetizer.image} alt={appetizer.name} borderRadius="md" />
                <Text fontWeight="bold">{appetizer.name}</Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MenuBoard;