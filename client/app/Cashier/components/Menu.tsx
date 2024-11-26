"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Heading, Spinner, Text } from "@chakra-ui/react";
import MenuItem from "./MenuItem";
import { fetchItems } from "../../store/slices/itemsSlice";
import { RootState, AppDispatch } from "../../store/store"; // Adjust these imports based on your store setup

interface MenuProps {
  type: string;
  onAddToOrder: (item: { name: string; id: number; item_type: string }) => void;
}

const Menu: React.FC<MenuProps> = ({ type, onAddToOrder }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Get the items state from Redux
  const { items, status, error } = useSelector((state: RootState) => state.items);

  // Fetch items when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [dispatch, status]);

  // Map items with IDs (if needed)
  const menuItems = items.map((item, index) => ({
    id: index + 1,
    name: item.item_name,
    item_type: item.item_type.toLowerCase(),
  }));

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

  // Handle loading and error states
  if (status === "loading") {
    return <Spinner size="lg" color="red.500" />;
  }

  if (status === "failed") {
    return <Text color="red.500">Error: {error}</Text>;
  }

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
