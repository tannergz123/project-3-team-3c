"use client";

import React, { useEffect, useState } from "react";
import { Box, Heading, Flex, Button, Grid, GridItem } from "@chakra-ui/react";
import Menu from "./components/Menu";
import BackButton from "../../components/BackButton";
import OrderDisplay from "./components/OrderDisplay";
import TypeSelector from "./components/TypeSelector";
import CurrentItemDisplay from "./components/CurrentItemDisplay";
import { OrderItem } from "../Types/orderTypes";
import { ITEM_REQUIREMENTS } from './components/CurrentItemDisplay';

// Define the prices for each type
const MENU_ITEM_PRICES = {
  "Appetizer": 3.50,
  "Bowl": 10.00,
  "Plate": 10.00,
  "Bigger Plate": 11.30,
  "A La Carte": 4.40,
  "Drink": 2.10,
};

export default function Page() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [type, setType] = useState("");

  // State for the current item being constructed
  const [currentItem, setCurrentItem] = useState<{
    type: string;
    price: number;
    entrees: { name: string; quantity: number }[];
    sides: string[];
    drink: string;
    appetizer: string;
  }>({
    type: "",
    price: 0,
    entrees: [],
    sides: [],
    drink: "",
    appetizer: "",
  });

  // Function to handle type selection and set price
  const handleTypeChange = (selectedType: string) => {
    setType(selectedType); // Update type state
    setCurrentItem({
      type: selectedType,
      price: MENU_ITEM_PRICES[selectedType] || 0, // Set price based on type
      entrees: [],
      sides: [],
      drink: "",
      appetizer: "",
    });
  };

  // Function to handle selecting an entrée
  const handleSelectEntree = (entree: string) => {
    console.log("current item type", currentItem.type);
    const maxEntrees = ITEM_REQUIREMENTS[currentItem.type]?.entrees || 0;
    const entreesSelected = currentItem.entrees.reduce((sum, e) => sum + e.quantity, 0);
  
    // Only add the entree if the current count is less than the max
    if (entreesSelected < maxEntrees) {
      setCurrentItem((prev) => {
        const existingEntree = prev.entrees.find((e) => e.name === entree);
        if (existingEntree) {
          existingEntree.quantity += 1;
        } else {
          prev.entrees.push({ name: entree, quantity: 1 });
        }
        return { ...prev };
      });
    }
  };  

  // Function to handle selecting a side
  const handleSelectSide = (side: string) => {
    const maxSides = ITEM_REQUIREMENTS[currentItem.type]?.sides || 0;
    const sidesSelected = currentItem.sides.length;
  
    // Only add the side if the current count is less than the max
    if (sidesSelected < maxSides) {
      setCurrentItem((prev) => ({
        ...prev,
        sides: [...prev.sides, side],
      }));
    }
  };
  

  const handleSelectDrink = (drink: string) => {
    if (!currentItem.drink) {
      setCurrentItem((prev) => ({
        ...prev,
        drink,
      }));
    }
  };
  
  const handleSelectAppetizer = (appetizer: string) => {
    // Only set the appetizer if no appetizer is currently selected
    if (!currentItem.appetizer) {
      setCurrentItem((prev) => ({
        ...prev,
        appetizer,
      }));
    } 
  }


  // Function to add the current item to the order
  const addItem = () => {
    const newItem: OrderItem = {
      name: currentItem.type,
      price: currentItem.price, // Add price to order item
      entrees: currentItem.entrees,
      drink: currentItem.drink,
      appetizer: currentItem.appetizer,
      sides: currentItem.sides,
      quantity: 1,
      cartItemId: Date.now(),
    };
    setOrder((prevOrder) => [...prevOrder, newItem]);
    resetCurrentItem();
  };

  // Function to reset the current item
  const resetCurrentItem = () => {
    setCurrentItem({ type, price: MENU_ITEM_PRICES[type] || 0, entrees: [], sides: [], drink: "", appetizer: ""});
  };

  // Function to remove an item from the order
  const handleRemoveFromOrder = (itemId: number) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((orderItem) => {
          if (orderItem.cartItemId === itemId) {
            return { ...orderItem, quantity: orderItem.quantity - 1 };
          }
          return orderItem;
        })
        .filter((orderItem) => orderItem.quantity > 0)
    );
  };

  return (
    <Box position="relative" fontSize="xl" pt="5vh">
      <Box position="absolute" top="10px" left="10px">
        <BackButton />
      </Box>

      <Flex direction="row" justify="normal" align="flex-start">
        <Box textAlign="center" width="30%" padding={10}>
          <CurrentItemDisplay currentItem={currentItem} />
          <OrderDisplay order={order} onRemoveFromOrder={handleRemoveFromOrder} />
        </Box>

        <Box textAlign="center" width="65%" pt="5vh">
          <Grid templateColumns="repeat(3, 1fr)" gap="1">
            <GridItem>
              <TypeSelector type={type} onTypeChange={handleTypeChange} />
            </GridItem>
            <GridItem>
              <Button colorScheme="teal" onClick={addItem}>
                Add Item
              </Button>
            </GridItem>
            <GridItem>
              <Button colorScheme="red" onClick={resetCurrentItem}>
                Reset Item
              </Button>
            </GridItem>
          </Grid>
          <Menu
            type={type}
            onAddToOrder={(item) => {
              if (item.item_type === "entree") {
                handleSelectEntree(item.name);
              } else if (item.item_type === "side") {
                handleSelectSide(item.name);
              }
              else if (item.item_type === "drink") {
                handleSelectDrink(item.name);
              }
              else if (item.item_type === "appetizer") {
                handleSelectAppetizer(item.name);
              }
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
