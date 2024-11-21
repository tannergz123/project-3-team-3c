import React from 'react';
import { Box, Text, Grid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setAppetizerQuantity } from '../../store/slices/currentSelectionSlice';
import ItemCard from './ItemCard';

interface Appetizer {
  name: string;
  image: string;
}

// List of appetizers
const appetizerList: Appetizer[] = [
  { name: "Apple Pie Roll", image: "/menu_images/appetizer/apple_pie_roll.avif" },
  { name: "Chicken Egg Roll", image: "/menu_images/appetizer/chicken_egg_roll.avif" },
  { name: "Cream Cheese Rangoon", image: "/menu_images/appetizer/cream_cheese_rangoon.avif" },
  { name: "Veggie Spring Roll", image: "/menu_images/appetizer/veggie_spring_roll.avif" },
];

const AppetizerSelector: React.FC = () => {
  const dispatch = useDispatch();
  const appetizerQuantities = useSelector((state: RootState) => state.currentSelection.appetizers);

  return (
    <Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}> Appetizers </Text>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {appetizerList.map((appetizer) => {
          const quantity = appetizerQuantities[appetizer.name] || 0;

          return (
            <ItemCard
              key={appetizer.name}
              item={appetizer}
              quantity={quantity}
              isIncrementDisabled={false} // No limit for appetizers
              isDisabled={false} // Always enabled
              onIncrement={() =>
                dispatch(
                  setAppetizerQuantity({
                    name: appetizer.name,
                    quantity: quantity + 1,
                  })
                )
              }
              onDecrement={() =>
                dispatch(
                  setAppetizerQuantity({
                    name: appetizer.name,
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

export default AppetizerSelector;