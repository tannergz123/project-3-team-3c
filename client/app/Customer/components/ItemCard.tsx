import React, { useState } from 'react';
import { Box, AspectRatio, Text } from '@chakra-ui/react';
import QuantityControl from './QuantityControl';

interface ItemCardProps {
  item: {
    name: string;
    image?: string; // Optional image property
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
  const [imageError, setImageError] = useState(false);

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
      {/* Fixed Aspect Ratio Container for Image */}
      <AspectRatio ratio={1} mb={2} borderRadius="md" overflow="hidden">
        <Box
          as="img"
          src={imageError ? "/static/missing-image.jpg" : item.image || "/static/missing-image.jpg"}
          alt={item.name}
          objectFit="contain" // Ensures the entire image is visible
          onError={() => setImageError(true)} // Set error state on failed load
          backgroundColor="gray.50" // Background for non-square images
        />
      </AspectRatio>

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