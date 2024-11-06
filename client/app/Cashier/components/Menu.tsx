"use client";

import React from "react";
import { Box, Grid, Heading } from "@chakra-ui/react";
import MenuItem from "./MenuItem";

interface MenuProps {
  type: string;
  onAddToOrder: (item: { name: string; id: number; item_type: string }) => void;
}

const menuItems = [
  { id: 1, name: "Orange Chicken", item_type: "entree" },
  { id: 2, name: "Kung Pao Chicken", item_type: "entree" },
  { id: 3, name: "Beijing Beef", item_type: "entree" },
  { id: 4, name: "Chow Mein", item_type: "side" },
  { id: 5, name: "Fried Rice", item_type: "side" },
  { id: 6, name: "Vegetable Spring Rolls", item_type: "appetizer" },
  { id: 7, name: "Honey Walnut Shrimp", item_type: "entree" },
  { id: 8, name: "Broccoli Beef", item_type: "entree" },
  { id: 9, name: "Drink", item_type: "drink" },
  { id: 10, name: "Egg Roll", item_type: "appetizer" },
  { id: 11, name: "Sweet and Sour Pork", item_type: "entree" },
  { id: 12, name: "Hot and Sour Soup", item_type: "appetizer" },
  { id: 13, name: "Kung Pao Shrimp", item_type: "entree" },
  { id: 14, name: "Mongolian Beef", item_type: "entree" },
  { id: 15, name: "Shrimp Fried Rice", item_type: "side" },
  { id: 16, name: "Chicken Fried Rice", item_type: "side" },
  { id: 17, name: "Crab Rangoon", item_type: "appetizer" },
  { id: 18, name: "General Tso's Chicken", item_type: "entree" },
  { id: 19, name: "Lo Mein", item_type: "side" },
  { id: 20, name: "Pot Stickers", item_type: "appetizer" },
  { id: 21, name: "Sesame Chicken", item_type: "entree" }
];

const Menu: React.FC<MenuProps> = ({ type, onAddToOrder }) => {
  // Filter menu items based on the selected type
  const filteredEntrees = menuItems.filter(
    (item) =>
      item.item_type === "entree" &&
      (type === "Bowl" || type === "Plate" || type === "Bigger Plate" || type === "A La Carte")
  );

  const filteredSides = menuItems.filter(
    (item) => item.item_type === "side" && (type === "Bowl" || type === "Plate" || type === "Bigger Plate")
  );

  const filteredAppetizers = menuItems.filter(
    (item) => item.item_type === "appetizer" && type === "Appetizer"
  );

  const filteredDrinks = menuItems.filter((item) => item.item_type === "drink" && type === "Drink");

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* Entrees Section */}
      {filteredEntrees.length > 0 && (
        <Box borderWidth="1px" borderRadius="md" p={3} borderColor="red.300">
          <Heading as="h3" size="sm" mb={2} color="red.600">
            Entrees
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {filteredEntrees.map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                itemType={item.item_type}
                onAddToOrder={() => onAddToOrder(item)}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Sides Section */}
      {filteredSides.length > 0 && (
        <Box borderWidth="1px" borderRadius="md" p={3} borderColor="red.300">
          <Heading as="h3" size="sm" mb={2} color="red.600">
            Sides
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {filteredSides.map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                itemType={item.item_type}
                onAddToOrder={() => onAddToOrder(item)}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Appetizers Section */}
      {filteredAppetizers.length > 0 && (
        <Box borderWidth="1px" borderRadius="md" p={3} borderColor="red.300">
          <Heading as="h3" size="sm" mb={2} color="red.600">
            Appetizers
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {filteredAppetizers.map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                itemType={item.item_type}
                onAddToOrder={() => onAddToOrder(item)}
              />
            ))}
          </Grid>
        </Box>
      )}

      {/* Drinks Section */}
      {filteredDrinks.length > 0 && (
        <Box borderWidth="1px" borderRadius="md" p={3} borderColor="red.300">
          <Heading as="h3" size="sm" mb={2} color="red.600">
            Drinks
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {filteredDrinks.map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                itemType={item.item_type}
                onAddToOrder={() => onAddToOrder(item)}
              />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Menu;
