import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addItemToCart } from '../../store/slices/orderSlice';
import EntreeSizeSelector from './EntreeSizeSelector';
import AppetizerSelector from './AppetizerSelector';
import { resetSelections } from '../../store/slices/currentSelectionSlice';
import { useToast } from '@chakra-ui/react';
import { ITEM_REQUIREMENTS } from '../../Cashier/components/CurrentItemDisplay';

const MainContent: React.FC = () => {
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const currentSelection = useSelector((state: RootState) => state.currentSelection);
  const dispatch = useDispatch();
  const toast = useToast()  
  const requirements = ITEM_REQUIREMENTS[currentSelection.selectedSize || ""] || { entrees: 0, sides: 0 };

  const totalSelectedEntrees = Object.values(currentSelection.entrees).reduce((sum, quantity) => sum + quantity, 0);
  const totalSelectedSides = Object.values(currentSelection.sides).reduce((sum, quantity) => sum + quantity, 0);


  const handleAddToOrder = () => {
  if (currentSelection.selectedSize) {
    dispatch(
      addItemToCart({
        name: currentSelection.selectedSize,
        entrees: Object.entries(currentSelection.entrees)
          .filter(([_, quantity]) => quantity > 0)
          .map(([name, quantity]) => ({ name, quantity })),
        sides: Object.entries(currentSelection.sides)
          .filter(([_, quantity]) => quantity > 0)
          .map(([name]) => name),
        drink: "",
        appetizer: "",
        quantity: 1,
        price: calculatePrice(currentSelection),
        cartItemId: Date.now(),
      })
    );
    // Reset current selection
    dispatch(resetSelections());
    // Display success feedback
    toast({
      title: "Item added to order!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
};

  const calculatePrice = (selection: RootState["currentSelection"]) => {
    // Example price calculation logic
    let price = 0;
    if (selection.selectedSize === "Bowl") price = 10;
    if (selection.selectedSize === "Plate") price = 10;
    if (selection.selectedSize === "Bigger Plate") price = 11.30;
    if (selection.selectedSize === "A La Carte") price = 4.40;
    // Add more pricing logic if needed
    return price;
  };

  const isButtonDisabled =
    !currentSelection.selectedSize || // No size selected
    totalSelectedEntrees !== requirements.entrees || // Entrees don't match the required count
    totalSelectedSides !== requirements.sides; // Sides don't match the required count

  return (
    <Box position="relative" height="100%">
      {/* Dynamic content based on selected category */}
      {selectedCategory === "Entrees" ? (
        <EntreeSizeSelector />
      ) : selectedCategory === "Appetizers" ? (
        <AppetizerSelector />
      ) : selectedCategory === "Drinks" ? (
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Drinks Section Coming Soon!
          </Text>
        </Box>
      ) : (
        <Box>
          <Text fontSize="lg" color="gray.600">
            Select a category to see options
          </Text>
        </Box>
      )}

      {/* Add to Order Button */}
      <Button
        position="fixed"
        bottom="35px"
        right="25px"
        colorScheme="red"
        boxShadow="lg"
        zIndex="1000"
        onClick={handleAddToOrder}
        isDisabled={isButtonDisabled}
      >
        Add to Order
      </Button>
    </Box>
  );
};

export default MainContent;
