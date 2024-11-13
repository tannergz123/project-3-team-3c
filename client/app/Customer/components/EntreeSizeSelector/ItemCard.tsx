// Customer/components/EntreeSizeSelector/ItemCard.tsx

import React, { useState, useEffect } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import QuantityControl from './QuantityControl';
import { ITEM_REQUIREMENTS } from '../../../Cashier/components/CurrentItemDisplay';

interface ItemCardProps {
  item: {
    name: string;
    image: string;
    type: string;
  };
  quantity: number;
  setInitialQuantity: (name: string, initialQuantity: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, quantity, setInitialQuantity, onIncrement, onDecrement }) => {
  const [isSelected, setIsSelected] = useState(false);

  // Handle item selection and initialize quantity on first click
  const handleCardClick = () => {
    if (!isSelected) {
      // Initialize quantity based on ITEM_REQUIREMENTS for the first selection
      const requirements = ITEM_REQUIREMENTS[item.type] || { entrees: 0, sides: 0 };
      setInitialQuantity(item.name, requirements.entrees); // Set initial entrees quantity
    }
    setIsSelected(true);
  };

  // Deselect item when quantity reaches zero
  useEffect(() => {
    if (quantity === 0 && isSelected) {
      setIsSelected(false);
    }
  }, [quantity, isSelected]);

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor={isSelected ? "blue.500" : "gray.200"}
      borderRadius="md"
      p={4}
      textAlign="center"
      boxShadow="sm"
      transition="all 0.2s"
      onClick={handleCardClick}
      cursor="pointer"
      height="320px"
    >
      {/* Image */}
      <Image
        src={item.image}
        alt={item.name}
        width="100%"
        height="auto"
        objectFit="cover"
        borderRadius="md"
        mb={2}
      />

      {/* Item Name */}
      <Text color="red.600" fontWeight="bold">{item.name}</Text>

      {/* Quantity Control (Visible only if selected and quantity > 0) */}
      {isSelected && (
        <Box mt={4}>
          <QuantityControl quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        </Box>
      )}
    </Box>
  );
};

export default ItemCard;
