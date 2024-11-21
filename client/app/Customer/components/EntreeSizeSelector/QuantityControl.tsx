import React from 'react';
import { HStack, Button, Text, Box } from '@chakra-ui/react';

interface QuantityControlProps {
  quantity: number;
  isIncrementDisabled: boolean;
  isDisabled: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, isDisabled, isIncrementDisabled, onIncrement, onDecrement }) => {
  return (
    <HStack spacing={4} align="center" justify="center">
      <Button size="sm" variant="outline" onClick={onDecrement} borderRadius="full" isDisabled ={isDisabled}>
        –
      </Button>
      <Box bg="red.600" color="white" borderRadius="full" p={2} px={4}>
        <Text fontWeight="bold" fontSize="lg">{quantity}</Text>
      </Box>
      <Button
        size="sm"
        variant="outline"
        onClick={onIncrement}
        borderRadius="full"
        isDisabled={isIncrementDisabled || isDisabled} // Disable increment button if true
      >
        +
      </Button>
    </HStack>
  );
};

export default QuantityControl;