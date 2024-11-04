import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { OrderItem } from "../../Types/orderTypes";

interface OrderDisplayProps {
  order: OrderItem[];
  onRemoveFromOrder: (itemName: string) => void;
}

const OrderDisplay: React.FC<OrderDisplayProps> = ({ order }) => {
  // Debugging log to see if order data is received
  console.log("OrderDisplay Props:", order);

  return (
    <VStack spacing={4} align="stretch">
      {order.length === 0 ? (
        <Text>No items in the order.</Text>
      ) : (
        order.map((item, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontWeight="bold">
              {item.name} x{item.quantity}
            </Text>
            <Box pl={4}>
              {item.entrees &&
                item.entrees.map((entree) => (
                  <Text key={entree.name}>
                    - {entree.name} x{entree.quantity}
                  </Text>
                ))}
              {item.sides &&
                item.sides.map((side, i) => (
                  <Text key={i}>- {side}</Text>
                ))}
            </Box>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default OrderDisplay;
