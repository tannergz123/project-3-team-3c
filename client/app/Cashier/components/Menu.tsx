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
];

const Menu: React.FC<MenuProps> = ({ type, onAddToOrder }) => {
  // Filter menu items based on the selected type
  const filteredEntrees = menuItems.filter(
    (item) => item.item_type === "entree" && (type === "Bowl" || type === "Plate" || type === "Bigger Plate" || type === "A La Carte")
  );

  const filteredSides = menuItems.filter(
    (item) => item.item_type === "side" && (type === "Bowl" || type === "Plate" || type === "Bigger Plate")
  );

  const filteredAppetizers = menuItems.filter(
    (item) => item.item_type === "appetizer" && type === "Appetizer"
  );

  const filteredDrinks = menuItems.filter(
    (item) => item.item_type === "drink" && type === "Drink"
  );

  return (
    <Box display="flex" flexDirection="column" gap={6}>
      {/* Entrees Section */}
      {filteredEntrees.length > 0 && (
        <Box borderWidth="1px" borderRadius="lg" p={4} bg="pandaRed.50">
          <Heading as="h3" size="md" mb={4} color="pandaRed.800">
            Entrees
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
        <Box borderWidth="1px" borderRadius="lg" p={4} bg="pandaGreen.50">
          <Heading as="h3" size="md" mb={4} color="pandaGreen.800">
            Sides
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
        <Box borderWidth="1px" borderRadius="lg" p={4} bg="pandaYellow.50">
          <Heading as="h3" size="md" mb={4} color="pandaYellow.800">
            Appetizers
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
        <Box borderWidth="1px" borderRadius="lg" p={4} bg="pandaBrown.50">
          <Heading as="h3" size="md" mb={4} color="pandaBrown.800">
            Drinks
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
