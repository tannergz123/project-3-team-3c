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
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

// Define the type for price items
interface PriceItem {
  name: string;
  price: number;
}

const Pricing = () => {
  // Explicitly type the state
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial prices from the backend
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://project-3-team-3c.onrender.com/menu-item-prices/get-menu-item-prices",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch prices.");
        }

        const data = await response.json();
        const formattedPrices = data.map((item: any) => ({
          name: item.menu_item_name,
          price: parseFloat(item.menu_item_price),
        }));

        setPrices(formattedPrices);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const handleEdit = (index: number) => {
    setIsEditing(index);
  };

  const handleSave = async (index: number) => {
    setLoading(true);

    try {
      const updatedItem = prices[index];
      const response = await fetch(
        "https://project-3-team-3c.onrender.com/menu-item-prices/update-menu-item-prices",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_item: updatedItem.name,
            price: updatedItem.price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update price.");
      }

      setIsEditing(null);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    setPrices((prevPrices) =>
      prevPrices.map((item, idx) =>
        idx === index ? { ...item, price: parseFloat(value) || 0 } : item
      )
    );
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
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Pricing
      </Heading>

      <Table variant="simple">
        <Tbody>
          {prices.map((item, index) => (
            <Tr key={index}>
              <Td width="60%">{item.name}</Td>
              <Td width="20%">
                {isEditing === index ? (
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(event) => handleInputChange(event, index)}
                    onBlur={() => handleSave(index)}
                    autoFocus
                  />
                ) : (
                  `$${item.price.toFixed(2)}`
                )}
              </Td>
              <Td width="20%">
                {isEditing === index ? (
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Pricing;