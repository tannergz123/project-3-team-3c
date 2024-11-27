import React, { useEffect } from "react";
import { Grid, GridItem, Box, Text, VStack, Button, AspectRatio } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setSelectedSize,
  setEntreeQuantity,
  setSideQuantity,
  resetSelections,
} from "../../store/slices/currentSelectionSlice";
import EntreeOptions from "./EntreeSectionComponents/EntreeOptions";
import SideOptions from "./EntreeSectionComponents/SideOptions";
import { ITEM_REQUIREMENTS } from "../../Cashier/components/CurrentItemDisplay";

const entreeSizes = [
  { name: "Bowl", sides: 1, entrees: 1 },
  { name: "Plate", sides: 1, entrees: 2 },
  { name: "Bigger Plate", sides: 1, entrees: 3 },
  { name: "A La Carte", sides: 0, entrees: 1 },
];

const EntreeSizeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedSize = useSelector((state: RootState) => state.currentSelection.selectedSize);
  const entreeQuantities = useSelector((state: RootState) => state.currentSelection.entrees);
  const sideQuantities = useSelector((state: RootState) => state.currentSelection.sides);

  // Initialize quantities based on size requirements
  useEffect(() => {
    if (selectedSize) {
      const requirements = ITEM_REQUIREMENTS[selectedSize];
      if (requirements) {
        // Reset only if the quantities don't meet the new requirements
        Object.keys(entreeQuantities).forEach((entree) => {
          const currentQuantity = entreeQuantities[entree];
          if (currentQuantity > requirements.entrees) {
            dispatch(setEntreeQuantity({ name: entree, quantity: 0 }));
          }
        });

        Object.keys(sideQuantities).forEach((side) => {
          const currentQuantity = sideQuantities[side];
          if (currentQuantity > requirements.sides) {
            dispatch(setSideQuantity({ name: side, quantity: 0 }));
          }
        });
      }
    }
  }, [selectedSize, dispatch, entreeQuantities, sideQuantities]);

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
        Select a Size
      </Text>

      {!selectedSize ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={4}>
          {entreeSizes.map((size) => (
            <GridItem
              key={size.name}
              onClick={() => dispatch(setSelectedSize(size.name))}
              cursor="pointer"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              p={4}
              textAlign="center"
              boxShadow="md"
              _hover={{ borderColor: "red.600", transform: "scale(1.05)" }}
              transition="all 0.2s"
            >
              <AspectRatio ratio={1} mb={2} borderRadius="md" overflow="hidden">
                <Box
                  as="img"
                  src={`/menu_images/${size.name.toLowerCase().replace(/ /g, "_")}.png`}
                  alt={size.name}
                  objectFit="contain"
                  backgroundColor="gray.50"
                />
              </AspectRatio>
              <Text fontWeight="bold" color="red.600">{size.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {size.entrees} Entree{size.entrees > 1 ? "s" : ""}, {size.sides} Side
                {size.sides > 1 ? "s" : ""}
              </Text>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Box>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="link"
            color="red.600"
            mb={4}
            onClick={() => dispatch(resetSelections())}
          >
            Back to Size Selection
          </Button>

          <Box position="relative" overflowY="auto" height={`calc(100vh - 150px)`} p={4}>
            <VStack align="stretch" spacing={4}>
              {selectedSize !== "A La Carte" && (
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
                    Sides (Half Portions)
                  </Text>
                  <SideOptions />
                </Box>
              )}

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
                  Entree (Select {ITEM_REQUIREMENTS[selectedSize]?.entrees || 1})
                </Text>
                <EntreeOptions />
              </Box>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EntreeSizeSelector;
