import React from 'react';
import { Box, Text, Grid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setAppetizerQuantity } from '../../store/slices/currentSelectionSlice';
import ItemCard from './ItemCard';

const AppetizerSelector: React.FC = () => {
  const dispatch = useDispatch();

  // Selectors to get items and current appetizer quantities
  const items = useSelector((state: RootState) => state.items.items);
  const appetizerQuantities = useSelector((state: RootState) => state.currentSelection.appetizers);

  // Filter items to only include appetizers
  const appetizerList = items.filter((item) => item.item_type === "Appetizer");

  return (
    <Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}> Appetizers </Text>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {appetizerList.map((appetizer) => {
          const quantity = appetizerQuantities[appetizer.item_name] || 0;

          return (
            <ItemCard
              key={appetizer.item_name}
              item={{
                name: appetizer.item_name,
                image: `/menu_images/${appetizer.item_name.toLowerCase().replace(/ /g, "_")}.png`,
                type: "Appetizer",
              }}
              quantity={quantity}
              isIncrementDisabled={false} // No limit for appetizers
              isDisabled={false} // Always enabled
              onIncrement={() =>
                dispatch(
                  setAppetizerQuantity({
                    name: appetizer.item_name,
                    quantity: quantity + 1,
                  })
                )
              }
              onDecrement={() =>
                dispatch(
                  setAppetizerQuantity({
                    name: appetizer.item_name,
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
