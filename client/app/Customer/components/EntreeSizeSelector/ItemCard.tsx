import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import QuantityControl from './QuantityControl';

interface ItemCardProps {
  item: {
    name: string;
    image: string;
    type?: string;
  };
  quantity: number;
  isIncrementDisabled: boolean;
  isDisabled: boolean; // Disable the entire card if true
  onIncrement: () => void;
  onDecrement: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  quantity,
  isIncrementDisabled,
  isDisabled,
  onIncrement,
  onDecrement,
}) => {
  const isSelected = quantity > 0; // Determine if the item is selected

  return (
    <Box
      bg="white"
      border="2px solid" // Thicker border
      borderColor={isSelected ? "red.500" : isDisabled ? "gray.400" : "gray.200"}
      borderRadius="md"
      p={4}
      textAlign="center"
      boxShadow="sm"
      transition="all 0.2s"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      opacity={isDisabled ? 0.6 : 1} // Dim the card if disabled
    >
      {/* Item Image */}
      <Image
        src={item.image}
        alt={item.name}
        width="100%"
        height="auto"
        objectFit="cover"
        mb={2}
        borderRadius="md"
      />

      {/* Item Name */}
      <Text fontWeight="bold" color="red.600">
        {item.name}
      </Text>

      {/* Quantity Control */}
      <QuantityControl
        quantity={quantity}
        isIncrementDisabled={isIncrementDisabled}
        isDisabled={isDisabled}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </Box>
  );
};

export default ItemCard;