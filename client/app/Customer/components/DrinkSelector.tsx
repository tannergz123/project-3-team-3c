import React from 'react';
import { Box, Text, Grid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setDrinkQuantity } from '../../store/slices/currentSelectionSlice';
import ItemCard from './ItemCard';

const DrinkSelector: React.FC = () => {
  const dispatch = useDispatch();

  // Selectors to get drinks from API data and the current drink quantities
  const items = useSelector((state: RootState) => state.items.items);
  const drinkQuantities = useSelector((state: RootState) => state.currentSelection.drinks || {});

  // Filter items to include only drinks
  const drinkList = items.filter((item) => item.item_type === "Drink");

  return (
    <Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}> Drinks </Text>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {drinkList.map((drink) => {
          const quantity = drinkQuantities[drink.item_name] || 0;

          return (
            <ItemCard
              key={drink.item_name}
              item={{
                name: drink.item_name,
                image: `/menu_images/drinks/${drink.item_name.toLowerCase().replace(/ /g, "_")}.png`,
                type: "Drink",
              }}
              quantity={quantity}
              isIncrementDisabled={false} // No limit for drinks
              isDisabled={false} // Always enabled
              onIncrement={() =>
                dispatch(
                  setDrinkQuantity({
                    name: drink.item_name,
                    quantity: quantity + 1,
                  })
                )
              }
              onDecrement={() =>
                dispatch(
                  setDrinkQuantity({
                    name: drink.item_name,
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
