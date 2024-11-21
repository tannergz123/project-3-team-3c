import React from 'react';
import { Grid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { setSideQuantity } from '../../../store/slices/currentSelectionSlice';
import ItemCard from './ItemCard';
import { ITEM_REQUIREMENTS } from '../../../Cashier/components/CurrentItemDisplay';

interface Side {
  name: string;
  image: string;
}

// List of side items
const sideList: Side[] = [
  { name: "Chow Mein", image: "/menu_images/side/chow_mein.png" },
  { name: "Fried Rice", image: "/menu_images/side/fried_rice.png" },
  { name: "White Steamed Rice", image: "/menu_images/side/white_rice.png" },
  // Add more sides as needed
];

const SideOptions: React.FC = () => {
  const dispatch = useDispatch();
  const sideQuantities = useSelector((state: RootState) => state.currentSelection.sides);
  const selectedSize = useSelector((state: RootState) => state.currentSelection.selectedSize);

  const requirements = ITEM_REQUIREMENTS[selectedSize || ""] || { sides: 0 };

  // Calculate the total number of sides currently selected
  const totalSides = Object.values(sideQuantities).reduce((sum, count) => sum + count, 0);
  const maxSidesReached = totalSides >= requirements.sides;

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={10}>
      {sideList.map((side) => {
        const isSelected = sideQuantities[side.name] > 0;
        const isDisabled = maxSidesReached && !isSelected;
        const isIncrementDisabled = maxSidesReached;

        return (
          <ItemCard
            key={side.name}
            item={{ ...side, type: "Side" }}
            quantity={sideQuantities[side.name] || 0}
            isIncrementDisabled={isIncrementDisabled}
            isDisabled={isDisabled} // Disable entire card if not selected and max is reached
            onIncrement={() =>
              dispatch(
                setSideQuantity({
                  name: side.name,
                  quantity: (sideQuantities[side.name] || 0) + 1,
                })
              )
            }
            onDecrement={() =>
              dispatch(
                setSideQuantity({
                  name: side.name,
                  quantity: Math.max((sideQuantities[side.name] || 0) - 1, 0),
                })
              )
            }
          />
        );
      })}
    </Grid>
  );
};

export default SideOptions;