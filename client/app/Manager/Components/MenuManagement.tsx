"use client";

import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
  Button,
  Input,
  HStack,
  Alert,
  AlertIcon,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

// Define the type for menu items
interface MenuItem {
  name: string;
  units: number;
  itemType: string;
  calories: number;
  protein: string;
}

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemType, setNewItemType] = useState<string>("Entree");
  const [newItemIngredients, setNewItemIngredients] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          "https://project-3-team-3c.onrender.com/items/get-all-items-quantity",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch menu items.");
        }

        const data = await response.json();
        const formattedItems = data.map((item: any) => ({
          name: item.item_name,
          units: item.quantity,
          itemType: item.item_type,
        }));

        setMenuItems(formattedItems);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const getColor = (units: number) => {
    return units < 20 ? "red.300" : "green.300";
  };

  const handleCookMore = async (index: number) => {
    const item = menuItems[index];
    try {
      setLoading(true);

      await fetch("https://project-3-team-3c.onrender.com/items/make-items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: item.name,
          quantity: 50, // Adding 50 units
        }),
      });

      setMenuItems((prevItems) =>
        prevItems.map((menuItem, idx) =>
          idx === index ? { ...menuItem, units: menuItem.units + 50 } : menuItem
        )
      );
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItemName.trim() || !newItemIngredients.trim()) {
      alert("Item name and ingredients cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      await fetch("https://project-3-team-3c.onrender.com/items/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: newItemName.trim(),
          item_type: newItemType,
          ingredients: newItemIngredients.split(",").map((ing) => ing.trim()),
        }),
      });

      setMenuItems((prevItems) => [
        ...prevItems,
        { name: newItemName.trim(), units: 0, itemType: newItemType, calories: 0, protein: "0" },
      ]);
      setNewItemName("");
      setNewItemIngredients("");
      setLoading(false);
      alert("Item added successfully!");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDeleteItem = async (index: number) => {
    const item = menuItems[index];
    try {
      setLoading(true);

      await fetch("https://project-3-team-3c.onrender.com/items/delete-item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: item.name,
        }),
      });

      setMenuItems((prevItems) => prevItems.filter((_, idx) => idx !== index));
      setLoading(false);
      alert("Item deleted successfully!");
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
    <Box height="700px" borderWidth="1px" borderRadius="lg" p={4} overflowY="auto">
      <Heading as="h2" size="md" mb={4}>
        Menu Management
      </Heading>

      <HStack spacing={4} mb={4}>
        <Input
          placeholder="New item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <Select value={newItemType} onChange={(e) => setNewItemType(e.target.value)}>
          <option value="Entree">Entree</option>
          <option value="Side">Side</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Drink">Drink</option>
        </Select>
        <Input
          placeholder="Ingredients (comma-separated)"
          value={newItemIngredients}
          onChange={(e) => setNewItemIngredients(e.target.value)}
        />
        <Button
          size="md"
          colorScheme="blue"
          onClick={handleAddItem}
          minWidth="120px" // Adjust the width as needed
        >
          Add Item
        </Button>
      </HStack>

      <Table variant="simple">
        <Tbody>
          {menuItems.map((item, index) => (
            <Tr key={index}>
              <Td width="40%">{item.name}</Td>
              <Td width="20%" bg={getColor(item.units)} borderRadius="md" textAlign="center">
                {item.units}
              </Td>
              <Td width="20%">
                <Button size="sm" colorScheme="orange" onClick={() => handleCookMore(index)}>
                  Cook More
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDeleteItem(index)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MenuManagement;