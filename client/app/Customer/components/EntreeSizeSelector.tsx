import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Box, Text, VStack, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import EntreeOptions from './EntreeSizeSelector/EntreeOptions';
import SideOptions from './EntreeSizeSelector/SideOptions';
import { ITEM_REQUIREMENTS } from '../../Cashier/components/CurrentItemDisplay';

const entreeSizes = ["Bowl", "Plate", "Bigger Plate", "A La Carte"];

const EntreeSizeSelector: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [entreeQuantities, setEntreeQuantities] = useState<{ [key: string]: number }>({});
  const [sideQuantities, setSideQuantities] = useState<{ [key: string]: number }>({});

  // Wrapper function to set specific entree quantities
  const setEntreeQuantity = (name: string, quantity: number) => {
    setEntreeQuantities((prev) => ({ ...prev, [name]: quantity }));
  };

  // Wrapper function to set specific side quantities
  const setSideQuantity = (name: string, quantity: number) => {
    setSideQuantities((prev) => ({ ...prev, [name]: quantity }));
  };

  useEffect(() => {
    if (selectedSize) {
      const requirements = ITEM_REQUIREMENTS[selectedSize];
      if (requirements) {
        // Initialize entree and side quantities based on requirements
        if (requirements.entrees) {
          setEntreeQuantity("initialEntrees", requirements.entrees);
        }
        if (requirements.sides) {
          setSideQuantity("initialSides", requirements.sides);
        }
      }
    }
  }, [selectedSize]);

  const handleBack = () => {
    setSelectedSize(null);
    setEntreeQuantities({});
    setSideQuantities({});
  };

  // Entree quantity handlers
  const handleEntreeIncrement = (name: string) => {
    setEntreeQuantities((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const handleEntreeDecrement = (name: string) => {
    setEntreeQuantities((prev) => ({ ...prev, [name]: Math.max((prev[name] || 0) - 1, 0) }));
  };

  // Side quantity handlers
  const handleSideIncrement = (name: string) => {
    setSideQuantities((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const handleSideDecrement = (name: string) => {
    setSideQuantities((prev) => ({ ...prev, [name]: Math.max((prev[name] || 0) - 1, 0) }));
  };

  const handleAddToOrder = () => {
    // Add logic here to add the selected size, entrees, and sides to the cart
    console.log("Added to order:", { selectedSize, entreeQuantities, sideQuantities });
  };

  return (
    <Box>
      {!selectedSize ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
          {entreeSizes.map((size) => (
            <GridItem
              key={size}
              onClick={() => setSelectedSize(size)}
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
            onClick={handleBack}
          >
            Back to Size Selection
          </Button>

          <Box position="relative" overflowY="auto" height={`calc(100vh - 150px)`} p={4}>
            <VStack align="stretch" spacing={4}>
              {selectedSize !== "A La Carte" && (
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>Sides</Text>
                  <SideOptions
                    setQuantities={setSideQuantity}
                    quantities={sideQuantities}
                    onIncrement={handleSideIncrement}
                    onDecrement={handleSideDecrement}
                  />
                </Box>
              )}

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>Entrees</Text>
                <EntreeOptions
                  setQuantities={setEntreeQuantity}
                  quantities={entreeQuantities}
                  onIncrement={handleEntreeIncrement}
                  onDecrement={handleEntreeDecrement}
                />
              </Box>
            </VStack>
          </Box>

          <Button
            position="fixed"
            bottom="35px"
            right="25px"
            colorScheme="red"
            boxShadow="lg"
            zIndex="1000"
            onClick={handleAddToOrder}
          >
            Add to Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EntreeSizeSelector;
