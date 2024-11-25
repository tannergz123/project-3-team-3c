"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
  Button,
  Divider,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeItemFromCart, updateCartItem, resetCart } from "../../store/slices/orderSlice";
import QuantityControl from "../components/QuantityControl";
import Header from "../components/Header";

const CartPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.order.items);
  const toast = useToast();

  const [customerName, setCustomerName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleRemove = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItem({ id, quantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const validateCustomerName = () => {
    return /^[a-zA-Z\s]+$/.test(customerName); // Name must contain only letters and spaces
  };

  const handlePlaceOrder = () => {
    setHasSubmitted(true);

    if (!validateCustomerName()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name with only letters.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Handle the order placement logic here (e.g., send to backend)
    toast({
      title: "Order Placed!",
      description: `Thank you, ${customerName}, your order has been placed.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Clear the cart
    dispatch(resetCart());
    setCustomerName("");
    setHasSubmitted(false);

    // Navigate back to the main menu
    router.push("/Customer");
  };

  return (
    <Box>
      {/* Header */}
      <Header
        title="My Bag"
        showBackButton
        isCartPage={true}
        onBack={() => router.back()}
      />

      {/* Main Content */}
      <Box px={6} py={8} bg="gray.50" minHeight="100vh">
        {/* Add More Items Button */}
        <Button
          variant="outline"
          colorScheme="red"
          mb={6}
          width="full"
          onClick={() => router.push("/Customer")}
        >
          + Add More Items
        </Button>

        {/* Order Section */}
        {cartItems.length === 0 ? (
          <Text color="gray.600" textAlign="center">
            Your cart is empty.
          </Text>
        ) : (
          <VStack align="stretch" spacing={6}>
            <Heading size="md">Your Order</Heading>
            {cartItems.map((item) => (
              <Box
                key={item.cartItemId}
                p={4}
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="sm"
                position="relative"
              >
                {/* Price in the top-right corner */}
                <Text position="absolute" top={3} right={3} fontWeight="bold" color="gray.700">
                  ${item.price.toFixed(2)}
                </Text>

                <HStack alignItems="flex-start" spacing={4}>
                  {/* Item Image */}
                  <Image
                    src={"/static/missing-image.jpg"} // Fallback image
                    alt={item.name}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                  />

                  {/* Item Details */}
                  <Box flex={1}>
                    <Text fontWeight="bold" fontSize="lg" color="gray.800">
                      {item.name}
                    </Text>
                    {item.entrees && item.entrees.length > 0 && (
                      <>
                        <Text fontSize="sm" color="gray.600">
                          Entrees:
                        </Text>
                        {item.entrees.map((entree, idx) => (
                          <Text key={idx} fontSize="sm" ml={2}>
                            - {entree.name} x{entree.quantity}
                          </Text>
                        ))}
                      </>
                    )}
                    {item.sides && item.sides.length > 0 && (
                      <>
                        <Text fontSize="sm" color="gray.600">
                          Sides:
                        </Text>
                        {item.sides.map((side, idx) => (
                          <Text key={idx} fontSize="sm" ml={2}>
                            - {side}
                          </Text>
                        ))}
                      </>
                    )}
                    {item.appetizer && (
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        Appetizer: {item.appetizer} x{item.quantity}
                      </Text>
                    )}
                    {item.drink && (
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        Drink: {item.drink} x{item.quantity}
                      </Text>
                    )}
                  </Box>
                </HStack>

                {/* Quantity Control */}
                <HStack justify="space-between" mt={4}>
                  <QuantityControl
                    quantity={item.quantity}
                    onIncrement={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                    onDecrement={() => handleQuantityChange(item.cartItemId, Math.max(item.quantity - 1, 0))}
                  />
                  <Button colorScheme="red" size="sm" onClick={() => handleRemove(item.cartItemId)}>
                    Remove
                  </Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}

        {/* Total and Checkout */}
        {cartItems.length > 0 && (
          <Box mt={8}>
            <Divider mb={4} />
            <HStack justifyContent="space-between">
              <Text fontWeight="bold" fontSize="lg">
                Total:
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                ${calculateTotal()}
              </Text>
            </HStack>

            {/* Customer Name Input */}
            <FormControl mt={4} isInvalid={!validateCustomerName() && hasSubmitted}>
              <FormLabel>Customer Name</FormLabel>
              <Input
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {!validateCustomerName() && hasSubmitted && (
                <FormErrorMessage>Name is required and must only contain letters.</FormErrorMessage>
              )}
            </FormControl>

            {/* Place Order Button */}
            <Button colorScheme="green" mt={4} width="full" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
