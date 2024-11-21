import React from 'react';
import { Grid, GridItem, Box, Text, VStack, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setSelectedSize,
  setEntreeQuantity,
  setSideQuantity,
  resetSelections,
} from '../../store/slices/currentSelectionSlice';
import EntreeOptions from './EntreeSizeSelector/EntreeOptions';
import SideOptions from './EntreeSizeSelector/SideOptions';
import { ITEM_REQUIREMENTS } from '../../Cashier/components/CurrentItemDisplay';

const entreeSizes = ["Bowl", "Plate", "Bigger Plate", "A La Carte"];

const EntreeSizeSelector: React.FC = () => {
  const dispatch = useDispatch();

  const selectedSize = useSelector((state: RootState) => state.currentSelection.selectedSize);
  const entreeQuantities = useSelector((state: RootState) => state.currentSelection.entrees);
  const sideQuantities = useSelector((state: RootState) => state.currentSelection.sides);

  // Initialize quantities based on size requirements
  React.useEffect(() => {
    if (selectedSize) {
      const requirements = ITEM_REQUIREMENTS[selectedSize];
      if (requirements) {
        if (requirements.entrees) {
          Object.keys(entreeQuantities).forEach((entree) => {
            dispatch(setEntreeQuantity({ name: entree, quantity: 0 }));
          });
        }
        if (requirements.sides) {
          Object.keys(sideQuantities).forEach((side) => {
            dispatch(setSideQuantity({ name: side, quantity: 0 }));
          });
        }
      }
    }
  }, [selectedSize, dispatch]);

  return (
    <Box>
      {!selectedSize ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
          {entreeSizes.map((size) => (
            <GridItem
              key={size}
              onClick={() => dispatch(setSelectedSize(size))}
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
              <Text fontWeight="bold" color="red.600">{size}</Text>
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
                  <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>Sides (Half Portions)</Text>
                  <SideOptions/>
                </Box>
              )}

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>Entrees</Text>
                <EntreeOptions/>
              </Box>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EntreeSizeSelector;
