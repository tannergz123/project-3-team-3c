import React from 'react';
import { Grid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { setEntreeQuantity } from '../../../store/slices/currentSelectionSlice';
import ItemCard from './ItemCard';
import { ITEM_REQUIREMENTS } from '../../../Cashier/components/CurrentItemDisplay';

interface Entree {
  name: string;
  image: string;
}

// Define entrees and their images
const entreeList: Entree[] = [
  { name: "Orange Chicken", image: "/menu_images/entree/orange_chicken.png" },
  { name: "Kung Pao Chicken", image: "/menu_images/entree/kp_chicken.png" },
  { name: "Beijing Beef", image: "/menu_images/entree/beijing_beef.png" },
  { name: "Grilled Teriyaki Chicken", image: "/menu_images/entree/teriyaki_chicken.png" },
  // Add more entrees as needed
];

const EntreeOptions: React.FC = () => {
  const dispatch = useDispatch();
  const entreeQuantities = useSelector((state: RootState) => state.currentSelection.entrees);
  const selectedSize = useSelector((state: RootState) => state.currentSelection.selectedSize);
  const requirements = ITEM_REQUIREMENTS[selectedSize || ""] || { entrees: 0 };

  // Calculate total entrees selected
  const totalEntrees = Object.values(entreeQuantities).reduce((sum, count) => sum + count, 0);
  const maxReached = totalEntrees >= requirements.entrees;
  const isIncrementDisabled= maxReached;

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={10}>
      {entreeList.map((entree) => (
        <ItemCard
          key={entree.name}
          item={{ ...entree, type: "Entree" }}
          quantity={entreeQuantities[entree.name] || 0}
          isIncrementDisabled={isIncrementDisabled}
          isDisabled={maxReached && !(entreeQuantities[entree.name] > 0)} // Disable only if max reached
          onIncrement={() =>
            dispatch(
              setEntreeQuantity({
                name: entree.name,
                quantity: (entreeQuantities[entree.name] || 0) + 1,
              })
            )
          }
          onDecrement={() =>
            dispatch(
              setEntreeQuantity({
                name: entree.name,
                quantity: Math.max((entreeQuantities[entree.name] || 0) - 1, 0),
              })
            )
          }
        />
      ))}
    </Grid>
  );
};

export default EntreeOptions;