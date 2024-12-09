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
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import BackButton from "../../components/BackButton";

// axios 


// Types for menu items
type MenuItem = {
  name: string;
  calories?: string;
  protein?: string;
  type?: string;
  image?: string; // URL to image or StaticImageData
  allergens: string;
};

type ComboOption = {
  name: string;
  price: number;
  details: string;
};

// Main MenuBoard Component
const MenuBoard: React.FC = () => {

  const [entrees, setEntrees] = useState<MenuItem[]>([]);
  const [sides, setSides] = useState<MenuItem[]>([]);
  const [appetizers, setAppetizers] = useState<MenuItem[]>([]);
  const [combos, setCombos] = useState<ComboOption[]>([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log('Fetching sides, entrees, appetizers');
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
            image: img_path ? img_path: "/menu_images/no_image.png",
            allergens: item.allergens ? item.allergens : "None"
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

        console.log("Items fetched successfully");
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    
    console.log('Fetching menu items');
    axios
      .get('https://project-3-team-3c.onrender.com/menu-item-prices/get-menu-items')
      .then((response) => {
        const menu_items = response.data;
        const menu_list: ComboOption[] = [];

        menu_items.forEach((item: any) => {

          const formattedItem = {
            name: item.menu_item_name,
            price: item.menu_item_price,
            details: item.menu_item_description,
          };

          menu_list.push(formattedItem);
        });

        setCombos(menu_list);

        console.log("Menu data fetched successfully");
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
                ${combo.price}
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
                    <Image
                        width="18.75vh"
                        height="12.5vh"
                        src={side.image}
                        alt={side.name}
                        objectFit="contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/static/missing-image.jpg";
                        }}
                      />
                    <Text fontWeight="bold">{side.name}</Text>
                    <HStack width="100%">
                      {side.allergens !== "None" && (
                        <Tooltip label={`Allergens: ${side.allergens}`} aria-label="Allergens info">
                          <InfoIcon ml={2} />
                        </Tooltip>
                      )}
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
                    {/* <Image width="18.75vh" height="12.5vh" src={entree.image} alt={entree.name} borderRadius="md" /> */}
                    <Image
                        /* as="img" */
                        width="18.75vh"
                        height="12.5vh"
                        src={entree.image}
                        alt={entree.name}
                        objectFit="contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/static/missing-image.jpg";
                        }}
                      />
                    <Text fontWeight="bold">{entree.name}</Text>
                    <HStack width="100%">
                      {entree.allergens !== "None" && (
                        <Tooltip label={`Allergens: ${entree.allergens}`} aria-label="Allergens info">
                          <InfoIcon ml={2} />
                        </Tooltip>
                      )}
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
                <Image
                  width="18.75vh"
                  height="12.5vh"
                  src={appetizer.image}
                  alt={appetizer.name}
                  objectFit="contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/static/missing-image.jpg";
                  }}
                />
                <Text fontWeight="bold">{appetizer.name}</Text>
                <HStack width="100%">
                      {appetizer.allergens !== "None" && (
                        <Tooltip label={`Allergens: ${appetizer.allergens}`} aria-label="Allergens info">
                          <InfoIcon ml={2} />
                        </Tooltip>
                      )}
                    </HStack>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MenuBoard;