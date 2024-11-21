import React from "react";
import { Box, Text, VStack, Divider, CloseButton } from "@chakra-ui/react";
import { OrderItem } from "../../types/orderTypes";

interface OrderDisplayProps {
  order: OrderItem[];
  onRemoveFromOrder: (itemId: number) => void;
}

const OrderDisplay: React.FC<OrderDisplayProps> = ({ order, onRemoveFromOrder }) => {
  // Calculate the total price of all items in the order
  const total = order.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <VStack
      spacing={4}
      align="stretch"
      bg="gray.50"
      borderWidth="1px"
      borderColor="red.300"
      borderRadius="md"
      p={4}
      boxShadow="lg"
    >
      <Text fontSize="xl" fontWeight="bold" color="red.600" textAlign="center">
        Order Total: ${total.toFixed(2)}
      </Text>
      <Divider borderColor="red.300" />
      {order.length === 0 ? (
        <Text color="red.500" textAlign="center">No items in the order.</Text>
      ) : (
        order.map((item, index) => (
          <Box key={index} position="relative" borderWidth="1px" borderRadius="lg" p={4} bg="white">
            {/* Red "X" Icon Button in the top-left corner */}
            <CloseButton
              position="absolute"
              top={2}
              right={2}
              color="red.500"
              onClick={() => onRemoveFromOrder(item.cartItemId)}
            />
            <Text fontWeight="bold" color="red.700">
              {item.name} - ${item.price.toFixed(2)}
            </Text>
            <Box pl={4}>
              {item.entrees &&
                item.entrees.map((entree) => (
                  <Text key={entree.name} color="red.600">
                    - {entree.name} x{entree.quantity}
                  </Text>
                ))}
              {item.sides &&
                item.sides.map((side, i) => (
                  <Text key={i} color="red.600">
                    - {side}
                  </Text>
                ))}
              {item.drink && <Text color="red.600">- {item.drink}</Text>}
              {item.appetizer && <Text color="red.600">- {item.appetizer}</Text>}
            </Box>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default OrderDisplay;
