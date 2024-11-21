"use client";

import React from 'react';
import { Box, Heading, VStack, Text, Button, HStack } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeItemFromCart, updateCartItem } from '../../store/slices/orderSlice';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.order.items);

  const handleRemove = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItem({ id, quantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Your Cart</Heading>
      {cartItems.length === 0 ? (
        <Text>No items in your cart.</Text>
      ) : (
        <VStack align="stretch" spacing={4}>
          {cartItems.map((item) => (
            <Box
              key={item.cartItemId}
              p={4}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              boxShadow="sm"
            >
              <HStack justifyContent="space-between">
                <Box>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text>Price: ${item.price.toFixed(2)}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </Box>
                <HStack>
                  <Button
                    size="sm"
                    onClick={() => handleQuantityChange(item.cartItemId, Math.max(item.quantity - 1, 0))}
                  >
                    -
                  </Button>
                  <Button size="sm" onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}>
                    +
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleRemove(item.cartItemId)}>
                    Remove
                  </Button>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
      {cartItems.length > 0 && (
        <Box mt={6}>
          <Text fontWeight="bold">Total: ${calculateTotal()}</Text>
          <Button colorScheme="green" mt={4}>
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
