// Customer/components/EntreeSizeSelector/SideOptions.tsx

import React from 'react';
import { Grid } from '@chakra-ui/react';
import ItemCard from './ItemCard';

interface Side {
  name: string;
  image: string;
}

interface SideOptionsProps {
  quantities: { [key: string]: number };
  setQuantities: (name: string, quantity: number) => void;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
}

// List of side items
const sideList: Side[] = [
  { name: "Chow Mein", image: "/menu_images/side/chow_mein.png" },
  { name: "Fried Rice", image: "/menu_images/side/fried_rice.png" },
  { name: "White Steamed Rice", image: "/menu_images/side/white_rice.png" },
  { name: "Brown Steamed Rice", image: "/menu_images/side/brown_rice.png" },
  // Add more sides as needed
];

const SideOptions: React.FC<SideOptionsProps> = ({ quantities, setQuantities, onIncrement, onDecrement }) => {
  const setInitialQuantity = (name: string, initialQuantity: number) => {
    setQuantities(name, initialQuantity);
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={10}>
      {sideList.map((side) => (
        <ItemCard
          key={side.name}
          item={{ ...side, type: "Side" }}
          quantity={quantities[side.name] || 0}
          setInitialQuantity={setInitialQuantity}
          onIncrement={() => onIncrement(side.name)}
          onDecrement={() => onDecrement(side.name)}
        />
      ))}
    </Grid>
  );
};

export default SideOptions;
