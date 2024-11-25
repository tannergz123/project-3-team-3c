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
import DrinkSelector from './DrinkSelector';

const MainContent: React.FC = () => {
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const currentSelection = useSelector((state: RootState) => state.currentSelection);
  const dispatch = useDispatch();
  const toast = useToast();
  const requirements = ITEM_REQUIREMENTS[currentSelection.selectedSize || ""] || { entrees: 0, sides: 0 };

  const totalSelectedEntrees = Object.values(currentSelection.entrees).reduce(
    (sum, quantity) => sum + quantity,
    0
  );
  const totalSelectedSides = Object.values(currentSelection.sides).reduce(
    (sum, quantity) => sum + quantity,
    0
  );
  const totalSelectedAppetizers = Object.values(currentSelection.appetizers || {}).reduce(
    (sum, quantity) => sum + quantity,
    0
  );
  const totalSelectedDrinks = Object.values(currentSelection.drinks || {}).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const handleAddToOrder = () => {
    if (!currentSelection.selectedSize && !selectedCategory) return;

    if (selectedCategory === "Appetizers" || selectedCategory === "Drinks") {
      // Handle appetizers or drinks: Add each selected item as a separate cart item
      const itemsToAdd = Object.entries(
        selectedCategory === "Appetizers"
          ? currentSelection.appetizers || {}
          : currentSelection.drinks || {}
      ).filter(([_, quantity]) => quantity > 0);

      itemsToAdd.forEach(([name, quantity]) => {
        for (let i = 0; i < quantity; i++) {
          dispatch(
            addItemToCart({
              name,
              entrees: [],
              sides: [],
              appetizer: selectedCategory === "Appetizers" ? name : "",
              drink: selectedCategory === "Drinks" ? name : "",
              quantity: 1,
              price: calculatePrice({ ...currentSelection, selectedSize: null }),
              cartItemId: Date.now(),
            })
          );
        }
      });
    } else {
      // Handle entrees or sides: Add them as a single cart item
      dispatch(
        addItemToCart({
          name: currentSelection.selectedSize || selectedCategory,
          entrees: Object.entries(currentSelection.entrees)
            .filter(([_, quantity]) => quantity > 0)
            .map(([name, quantity]) => ({ name, quantity })),
          sides: Object.entries(currentSelection.sides)
            .filter(([_, quantity]) => quantity > 0)
            .map(([name]) => name),
          appetizer: "",
          drink: "",
          quantity: 1,
          price: calculatePrice(currentSelection),
          cartItemId: Date.now(),
        })
      );
    }

    // Reset current selection
    dispatch(resetSelections());

    // Display success feedback
    toast({
      title: "Added to order!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };


  const calculatePrice = (selection: RootState["currentSelection"]) => {
    let price = 0;
    if (selection.selectedSize === "Bowl") price = 10;
    if (selection.selectedSize === "Plate") price = 10;
    if (selection.selectedSize === "Bigger Plate") price = 11.30;
    if (selection.selectedSize === "A La Carte") price = 4.40;
    if (selectedCategory === "Appetizers") price = 3.50;
    if (selectedCategory === "Drinks") price = 2.10;
    return price;
  };

  const isButtonDisabled =
    selectedCategory === "Entrees"
      ? !currentSelection.selectedSize ||
        totalSelectedEntrees !== requirements.entrees ||
        totalSelectedSides !== requirements.sides
      : selectedCategory === "Appetizers"
      ? totalSelectedAppetizers == 0
      : selectedCategory === "Drinks"
      ? totalSelectedDrinks == 0
      : true;

  return (
    <Box position="relative" height="100%">
      {selectedCategory === "Entrees" ? (
        <EntreeSizeSelector />
      ) : selectedCategory === "Appetizers" ? (
        <AppetizerSelector />
      ) : selectedCategory === "Drinks" ? (
        <DrinkSelector />
      ) : (
        <Box>
          <Text fontSize="lg" color="gray.600">
            Select a category to see options
          </Text>
        </Box>
      )}

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