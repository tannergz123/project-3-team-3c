"use client";

import React, { useState } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import Menu from "./components/Menu";
import BackButton from "../../components/BackButton";
import OrderDisplay from "./components/OrderDisplay";
import TypeSelector from "./components/TypeSelector";
import { OrderItem } from "../Types/orderTypes";

export default function Page() {
  const [order, setOrder] = useState<OrderItem[]>([]); // State for the current order
  const [type, setType] = useState("Bowl");
  const [currentOrder, setCurrentOrder] = useState<{
    type: string;
    entrees: { name: string; quantity: number }[];
    sides: string[];
  }>({
    type: "Bowl",
    entrees: [],
    sides: [],
  });

  // Function to handle selecting an entrée
  const handleSelectEntree = (entree: string) => {
    setCurrentOrder((prev) => {
      const existingEntree = prev.entrees.find((e) => e.name === entree);
      if (existingEntree) {
        // Increase quantity if the entrée already exists
        existingEntree.quantity += 1;
      } else {
        // Add new entrée if it doesn't exist
        prev.entrees.push({ name: entree, quantity: 1 });
      }
      return { ...prev };
    });
    updateOrderDisplay();
  };

  // Function to handle selecting a side
  const handleSelectSide = (side: string) => {
    setCurrentOrder((prev) => ({
      ...prev,
      sides: [...prev.sides, side],
    }));
    updateOrderDisplay();
  };

  // Function to update the order display
  const updateOrderDisplay = () => {
    // Check if the order configuration is complete (e.g., Bowl needs 1 entree and 1 side)
    const isOrderComplete =
      (currentOrder.type === "Bowl" && currentOrder.entrees.length === 1 && currentOrder.sides.length === 1) ||
      (currentOrder.type === "Plate" && currentOrder.entrees.length === 2 && currentOrder.sides.length === 1) ||
      (currentOrder.type === "Bigger Plate" && currentOrder.entrees.length === 3 && currentOrder.sides.length === 1);

    if (isOrderComplete) {
      const newItem: OrderItem = {
        name: currentOrder.type,
        entrees: currentOrder.entrees,
        sides: currentOrder.sides,
        quantity: 1,
      };
      setOrder((prevOrder) => [...prevOrder, newItem]);
      resetCurrentOrder();
    }
  };

  // Function to reset the current order
  const resetCurrentOrder = () => {
    setCurrentOrder({ type, entrees: [], sides: [] });
  };

  // Function to remove an item from the order
  const handleRemoveFromOrder = (itemName: string) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((orderItem) => {
          if (orderItem.name === itemName) {
            return { ...orderItem, quantity: orderItem.quantity - 1 };
          }
          return orderItem;
        })
        .filter((orderItem) => orderItem.quantity > 0) // Remove items with 0 quantity
    );
  };

  return (
    <Box position="relative" fontSize="xl" pt="10vh">
      {/* Back Button positioned in the top left */}
      <Box position="absolute" top="10px" left="10px">
        <BackButton />
      </Box>

      {/* Layout for Menu and Order Display */}
      <Flex direction="row" justify="normal" align="flex-start">
        {/* Order Display */}
        <Box textAlign="center" width="40%">
          <OrderDisplay order={order} onRemoveFromOrder={handleRemoveFromOrder} />
        </Box>

        {/* Menu Component */}
        <Box textAlign="center" width="50%" pt="5vh">
          <TypeSelector type={type} setType={setType} />
          <Menu
            type={type}
            onAddToOrder={(item) => {
              if (item.item_type === "entree") {
                handleSelectEntree(item.name);
              } else if (item.item_type === "side") {
                handleSelectSide(item.name);
              }
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
