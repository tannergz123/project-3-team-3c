import React from 'react';
import { HStack, Button, Text, Box } from '@chakra-ui/react';

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <Box 
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="full"
      p={1}
      px={5}
      boxShadow="sm"
      width="fit-content"
      mx="auto"      
      mt = {10}
    >
      <HStack spacing={2} align="center" justify="center">
        <Button size="xs" variant="outline" onClick={onDecrement} borderRadius="full" minWidth="24px" p={1}>
          –
        </Button>
        <Box bg="red.600" color="white" borderRadius="full" p={1} px={3} minWidth="28px" textAlign="center">
          <Text fontWeight="bold" fontSize="md">{quantity}</Text>
        </Box>
        <Button size="xs" variant="outline" onClick={onIncrement} borderRadius="full" minWidth="24px" p={1}>
          +
        </Button>
      </HStack>
    </Box>
  );
};

export default QuantityControl;
