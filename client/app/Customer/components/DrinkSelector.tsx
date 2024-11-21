import React from 'react';
import { Box, Text, Grid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setDrinkQuantity } from '../../store/slices/currentSelectionSlice';
import ItemCard from './ItemCard';

interface Drink {
  name: string;
  image: string;
}

// List of drink items
const drinkList: Drink[] = [
  { name: "Coca-Cola", image: "/menu_images/drinks/coca_cola.png" },
  { name: "Sprite", image: "/menu_images/drinks/sprite.png" },
  { name: "Barq's Root Beer", image: "/menu_images/drinks/barqs.png" },
  { name: "Diet Coke", image: "/menu_images/drinks/diet-coke.png" },
];

const DrinkSelector: React.FC = () => {
  const dispatch = useDispatch();
  const drinkQuantities = useSelector((state: RootState) => state.currentSelection.drinks || {});

  return (
    <Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}> Drinks </Text>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {drinkList.map((drink) => {
          const quantity = drinkQuantities[drink.name] || 0;

          return (
            <ItemCard
              key={drink.name}
              item={drink}
              quantity={quantity}
              isIncrementDisabled={false} // No limit for drinks
              isDisabled={false} // Always enabled
              onIncrement={() =>
                dispatch(
                  setDrinkQuantity({
                    name: drink.name,
                    quantity: quantity + 1,
                  })
                )
              }
              onDecrement={() =>
                dispatch(
                  setDrinkQuantity({
                    name: drink.name,
                    quantity: Math.max(quantity - 1, 0),
                  })
                )
              }
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default DrinkSelector;