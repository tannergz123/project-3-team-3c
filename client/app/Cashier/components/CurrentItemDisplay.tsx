import React from "react";
import { Box, Text, VStack, Divider } from "@chakra-ui/react";

interface CurrentItemDisplayProps {
  currentItem: {
    type: string;
    price: number;
    entrees: { name: string; quantity: number }[];
    sides: string[];
    drink: string;
    appetizer: string;
  };
}

export const ITEM_REQUIREMENTS = {
  "Bowl": { entrees: 1, sides: 1 },
  "Plate": { entrees: 2, sides: 1 },
  "Bigger Plate": { entrees: 3, sides: 1 },
  "A La Carte": { entrees: 1, sides: 0 },
  "Drink": { entrees: 0, sides: 0, drinks: 1 },
  "Appetizer": { entrees: 0, sides: 0, appetizers: 1 },
};

const CurrentItemDisplay: React.FC<CurrentItemDisplayProps> = ({ currentItem }) => {
  // Provide a default empty requirement object if type is not found in ITEM_REQUIREMENTS
  const requirements = ITEM_REQUIREMENTS[currentItem.type] || { entrees: 0, sides: 0, drinks: 0, appetizers: 0 };
  
  const entreesSelected = currentItem.entrees.reduce((sum, entree) => sum + entree.quantity, 0);
  const sidesSelected = currentItem.sides.length;
  const drinkSelected = currentItem.drink ? 1 : 0;
  const appetizerSelected = currentItem.appetizer ? 1 : 0;

  return (
    <VStack
      spacing={4}
      align="stretch"
      bg="white"
      borderWidth="1px"
      borderColor="red.300"
      borderRadius="md"
      p={4}
      boxShadow="lg"
    >
      <Text fontSize="xl" fontWeight="bold" color="red.600" textAlign="center">
        Current Item: {currentItem.type} - ${currentItem.price.toFixed(2)}
      </Text>
      <Divider borderColor="red.300" />

      <Box pl={4}>
        {requirements.entrees > 0 && (
          <>
            <Text color="red.500">
              Selected Entrees: {entreesSelected} / {requirements.entrees}
            </Text>
            {currentItem.entrees.map((entree, index) => (
              <Text key={index} color="red.600">
                - {entree.name} x{entree.quantity}
              </Text>
            ))}
          </>
        )}

        {requirements.sides > 0 && (
          <>
            <Text color="red.500">
              Selected Sides: {sidesSelected} / {requirements.sides}
            </Text>
            {currentItem.sides.map((side, index) => (
              <Text key={index} color="red.600">
                - {side}
              </Text>
            ))}
          </>
        )}

        {requirements.drinks > 0 && (
          <Text color="red.500">
            Selected Drink: {drinkSelected} / {requirements.drinks}
            <Text color="red.600">{currentItem.drink}</Text>
          </Text>
        )}

        {requirements.appetizers > 0 && (
          <>
            <Text color="red.500">
              Selected Appetizer: {appetizerSelected} / {requirements.appetizers}
            </Text>
            <Text color="red.600">{currentItem.appetizer}</Text>
          </>
        )}
      </Box>
    </VStack>
  );
};

export default CurrentItemDisplay;
