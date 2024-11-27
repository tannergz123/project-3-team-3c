"use client";

import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  Heading,
  Button,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface IngredientItem {
  name: string;
  quantity: number;
  orderQuantity: number;
}

const InventoryManagement = () => {
  const [items, setItems] = useState<IngredientItem[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://project-3-team-3c.onrender.com/ingredients/get-ingredients",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ingredients.");
        }

        const data = await response.json();
        const formattedItems = data.map((item: any) => ({
          name: item.ingredient_name,
          quantity: item.quantity,
          orderQuantity: 0,
        }));

        setItems(formattedItems);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const getColor = (quantity: number) => {
    if (quantity > 150) return "green.300";
    if (quantity >= 30 && quantity <= 50) return "yellow.300";
    if (quantity < 20) return "red.300";
    return "gray.200";
  };

  const handleIncrement = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, orderQuantity: item.orderQuantity + 50 } : item
      )
    );
  };

  const handleDecrement = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index
          ? { ...item, orderQuantity: Math.max(0, item.orderQuantity - 50) }
          : item
      )
    );
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      for (const item of items) {
        if (item.orderQuantity > 0) {
          await fetch(
            "https://project-3-team-3c.onrender.com/ingredients/order-ingredients",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ingredient_name: item.name,
                quantity: item.orderQuantity,
              }),
            }
          );
        }
      }

      const updatedItems = items.map((item) => ({
        ...item,
        quantity: item.quantity + item.orderQuantity,
        orderQuantity: 0,
      }));

      setItems(updatedItems);
      setLoading(false);
      alert("Order placed and inventory updated!");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddIngredient = async () => {
    if (!newIngredient.trim()) {
      alert("Ingredient name cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://project-3-team-3c.onrender.com/ingredients/add-ingredients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredient_name: newIngredient.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add ingredient.");
      }

      setItems((prevItems) => [
        ...prevItems,
        { name: newIngredient.trim(), quantity: 0, orderQuantity: 0 },
      ]);
      setNewIngredient("");
      setLoading(false);
      alert("Ingredient added successfully!");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box p={4}>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} height="700px" overflowY="auto">
      <Heading as="h2" size="md" mb={4}>
        Inventory Management
      </Heading>

      <HStack spacing={4} mb={4}>
        <Input
          placeholder="New ingredient name"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <Button size="md" colorScheme="blue" onClick={handleAddIngredient}>
          Add Ingredient
        </Button>
      </HStack>

      <Button size="md" colorScheme="orange" mb={4} onClick={handlePlaceOrder}>
        Place Order
      </Button>

      <Table variant="simple">
        <Tbody>
          {items.map((item, index) => (
            <Tr key={index}>
              <Td width="40%">{item.name}</Td>
              <Td
                width="20%"
                bg={getColor(item.quantity)}
                borderRadius="md"
                textAlign="center"
              >
                {item.quantity}
              </Td>
              <Td width="40%">
                <HStack spacing={2}>
                  <Button size="sm" onClick={() => handleDecrement(index)}>
                    -
                  </Button>
                  <Text>{item.orderQuantity}</Text>
                  <Button size="sm" onClick={() => handleIncrement(index)}>
                    +
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryManagement;