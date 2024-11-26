import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Spinner } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addItemToCart } from '../../store/slices/orderSlice';
import EntreeSizeSelector from './EntreeSizeSelector';
import AppetizerSelector from './AppetizerSelector';
import { resetSelections } from '../../store/slices/currentSelectionSlice';
import { useToast } from '@chakra-ui/react';
import { ITEM_REQUIREMENTS } from '../../Cashier/components/CurrentItemDisplay';
import DrinkSelector from './DrinkSelector';
import axios from 'axios';

const MainContent: React.FC = () => {
  const [menuPrices, setMenuPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const currentSelection = useSelector((state: RootState) => state.currentSelection);
  const dispatch = useDispatch();
  const toast = useToast();
  const requirements = ITEM_REQUIREMENTS[currentSelection.selectedSize || ''] || { entrees: 0, sides: 0 };

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

  useEffect(() => {
    const fetchMenuPrices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://project-3-team-3c.onrender.com/menu-item-prices/get-menu-item-prices'
        );
        const prices = response.data.reduce((acc: Record<string, number>, item: any) => {
          acc[item.menu_item_name.toLowerCase()] = parseFloat(item.menu_item_price);
          return acc;
        }, {});
        setMenuPrices(prices);
      } catch (error) {
        setError('Failed to load menu prices.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuPrices();
  }, []);

  const calculatePrice = (selection: RootState['currentSelection']) => {
    if (loading || error) return 0;

    const size = selection.selectedSize?.toLowerCase();
    if (size && menuPrices[size]) return menuPrices[size];

    if (selectedCategory === 'Appetizers') return menuPrices['appetizer'] || 0;
    if (selectedCategory === 'Drinks') return menuPrices['drink'] || 0;

    return 0;
  };

  const handleAddToOrder = () => {
    if (!currentSelection.selectedSize && !selectedCategory) return;

    if (selectedCategory === 'Appetizers' || selectedCategory === 'Drinks') {
      const itemsToAdd = Object.entries(
        selectedCategory === 'Appetizers'
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
              appetizer: selectedCategory === 'Appetizers' ? name : '',
              drink: selectedCategory === 'Drinks' ? name : '',
              quantity: 1,
              price: calculatePrice({ ...currentSelection, selectedSize: null }),
              cartItemId: Date.now(),
            })
          );
        }
      });
    } else {
      dispatch(
        addItemToCart({
          name: currentSelection.selectedSize || selectedCategory,
          entrees: Object.entries(currentSelection.entrees)
            .filter(([_, quantity]) => quantity > 0)
            .map(([name, quantity]) => ({ name, quantity })),
          sides: Object.entries(currentSelection.sides)
            .filter(([_, quantity]) => quantity > 0)
            .flatMap(([name, quantity]) => Array(quantity).fill(name)),
          appetizer: '',
          drink: '',
          quantity: 1,
          price: calculatePrice(currentSelection),
          cartItemId: Date.now(),
        })
      );
    }

    dispatch(resetSelections());
    toast({
      title: 'Added to order!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const isButtonDisabled =
    loading ||
    selectedCategory === 'Entrees'
      ? !currentSelection.selectedSize ||
        totalSelectedEntrees !== requirements.entrees ||
        totalSelectedSides !== requirements.sides
      : selectedCategory === 'Appetizers'
      ? totalSelectedAppetizers === 0
      : selectedCategory === 'Drinks'
      ? totalSelectedDrinks === 0
      : true;

  if (loading) {
    return (
      <Box>
        <Spinner size="lg" />
        <Text>Loading menu prices...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box position="relative" height="100%">
      {selectedCategory === 'Entrees' ? (
        <EntreeSizeSelector />
      ) : selectedCategory === 'Appetizers' ? (
        <AppetizerSelector />
      ) : selectedCategory === 'Drinks' ? (
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
