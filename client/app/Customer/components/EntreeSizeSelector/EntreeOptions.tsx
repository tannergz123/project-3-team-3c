// Customer/components/EntreeSizeSelector/EntreeOptions.tsx

import React from 'react';
import { Grid } from '@chakra-ui/react';
import ItemCard from './ItemCard';

interface Entree {
  name: string;
  image: string;
  type: string;
}

interface EntreeOptionsProps {
  quantities: { [key: string]: number };
  setQuantities: (name: string, quantity: number) => void;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
}

// Define entrees and their types
const entreeList: Entree[] = [
  { name: "Orange Chicken", image: "/menu_images/entree/orange_chicken.png", type: "Bowl" },
  { name: "Kung Pao Chicken", image: "/menu_images/entree/kp_chicken.png", type: "Plate" },
  { name: "Beijing Beef", image: "/menu_images/entree/beijing_beef.png", type: "Bigger Plate" },
  { name: "Grilled Teriyaki Chicken", image: "/menu_images/entree/teriyaki_chicken.png", type: "Bowl" },
  // Add more entrees as needed
];

// Set initial quantity based on ITEM_REQUIREMENTS
const EntreeOptions: React.FC<EntreeOptionsProps> = ({ quantities, setQuantities, onIncrement, onDecrement }) => {
  const setInitialQuantity = (name: string, initialQuantity: number) => {
    setQuantities(name, initialQuantity); // Directly set initial quantity
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={10}>
      {entreeList.map((entree) => (
        <ItemCard
          key={entree.name}
          item={entree}
          quantity={quantities[entree.name] || 0}
          setInitialQuantity={setInitialQuantity}
          onIncrement={() => onIncrement(entree.name)}
          onDecrement={() => onDecrement(entree.name)}
        />
      ))}
    </Grid>
  );
};

export default EntreeOptions;
