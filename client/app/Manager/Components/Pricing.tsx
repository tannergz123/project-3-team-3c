"use client"

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
  TableContainer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface PriceItem {
  name: string;
  price: number;
}

const Pricing = () => {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <Box height="700px" borderWidth="1px" borderRadius="lg" p={4} display="flex" flexDirection="column">
      <Heading as="h2" size="md" mb={4}>
        Pricing
      </Heading>

      <TableContainer flex="1">
        <Table variant="simple" height="100%">
          <Tbody>
            {prices.map((item, index) => (
              <Tr key={index} height="80px"> {/* Adjust height of rows */}
                <Td fontSize="lg" width="60%">{item.name}</Td>
                <Td fontSize="lg" width="20%">
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
                      size="md"
                      colorScheme="green"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="md"
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
      </TableContainer>
    </Box>
  );
};

export default Pricing;