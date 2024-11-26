"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Button, Grid, GridItem, Select, Input, useToast } from "@chakra-ui/react";
import Menu from "./components/Menu";
import BackButton from "../../components/BackButton";
import OrderDisplay from "./components/OrderDisplay";
import TypeSelector from "./components/TypeSelector";
import CurrentItemDisplay from "./components/CurrentItemDisplay";
import { OrderItem } from "../Types/orderTypes";
import { ITEM_REQUIREMENTS } from "./components/CurrentItemDisplay";

export default function Page() {
  const [menuPrices, setMenuPrices] = useState<Record<string, number>>({});

  const [order, setOrder] = useState<OrderItem[]>([]);
  const [type, setType] = useState("");

  const [employees, setEmployees] = useState<
    { employee_name: string; active_employee: boolean }[]
  >([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [customerName, setCustomerName] = useState("");

  const toast = useToast();

  useEffect(() => {
    const fetchMenuPrices = async () => {
      try {
        const response = await axios.get(
          "https://project-3-team-3c.onrender.com/menu-item-prices/get-menu-item-prices"
        );
        const prices = response.data.reduce((acc: Record<string, number>, item: any) => {
          acc[item.menu_item_name.toLowerCase()] = parseFloat(item.menu_item_price);
          return acc;
        }, {});
        setMenuPrices(prices);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://project-3-team-3c.onrender.com/employees/get-employees"
        );
        const activeEmployees = response.data.filter((emp: any) => emp.active_employee);
        setEmployees(activeEmployees);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchMenuPrices();
    fetchEmployees();
  }, []);

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

  const handleTypeChange = (selectedType: string) => {
    setType(selectedType);
    setCurrentItem({
      type: selectedType,
      price: menuPrices[selectedType.toLowerCase()] || 0,
      entrees: [],
      sides: [],
      drink: "",
      appetizer: "",
    });
  };

  const handleSelectEntree = (entree: string) => {
    const maxEntrees = ITEM_REQUIREMENTS[currentItem.type]?.entrees || 0;
    const entreesSelected = currentItem.entrees.reduce((sum, e) => sum + e.quantity, 0);

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

  const handleSelectSide = (side: string) => {
    const maxSides = ITEM_REQUIREMENTS[currentItem.type]?.sides || 0;
    const sidesSelected = currentItem.sides.length;

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
    if (!currentItem.appetizer) {
      setCurrentItem((prev) => ({
        ...prev,
        appetizer,
      }));
    }
  };

  const addItem = () => {
    const itemRequirements = ITEM_REQUIREMENTS[currentItem.type];
    const entreesSelected = currentItem.entrees.reduce((sum, e) => sum + e.quantity, 0);

    if (
      (itemRequirements?.entrees && entreesSelected < itemRequirements.entrees) ||
      (itemRequirements?.sides && currentItem.sides.length < itemRequirements.sides) ||
      (itemRequirements?.drink && !currentItem.drink) ||
      (itemRequirements?.appetizer && !currentItem.appetizer)
    ) {
      toast({
        title: "Item requirements not met",
        description: `Make sure to meet the requirements for ${currentItem.type}`,
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const newItem: OrderItem = {
      name: currentItem.type,
      price: currentItem.price,
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

  const resetCurrentItem = () => {
    setCurrentItem({
      type,
      price: menuPrices[type.toLowerCase()] || 0,
      entrees: [],
      sides: [],
      drink: "",
      appetizer: "",
    });
  };

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

  const handleSubmitOrder = async () => {
    if (!selectedEmployee || !customerName) {
      toast({
        title: "Missing information",
        description: "Please select an employee and enter a customer name.",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const subItems = order.flatMap((item) => {
      if (item.entrees.length > 0 || item.sides.length > 0) {
        return Array(item.quantity)
          .fill(null)
          .map(() => [
            ...item.entrees.flatMap((entree) =>
              Array(entree.quantity).fill(entree.name)
            ),
            ...item.sides,
          ]);
      }
      if (item.appetizer) {
        return Array(item.quantity).fill([item.appetizer]);
      }
      if (item.drink) {
        return Array(item.quantity).fill([item.drink]);
      }
      return [];
    });

    const prices = order.flatMap((item) =>
      Array(item.quantity).fill(item.price)
    );

    const payload = {
      employee_name: selectedEmployee,
      customer_name: customerName,
      total_price: order.reduce((sum, item) => sum + item.price * item.quantity, 0),
      prices: prices,
      sub_items: subItems,
    };

    try {
      await axios.post(
        "https://project-3-team-3c.onrender.com/orders/place-order",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast({ title: "Order placed successfully!", status: "success", duration: 3000 });
      setOrder([]);
      setCustomerName("");
      setSelectedEmployee("");
    } catch (error) {
      toast({ title: "Failed to place order.", status: "error", duration: 3000 });
      console.error("Order placement failed:", error);
    }
  };

  return (
    <Box position="relative" fontSize="xl" pt="5vh">
      <Box position="absolute" top="10px" left="10px">
        <BackButton />
      </Box>

      <Flex direction="row" justify="normal" align="flex-start">
        <Box textAlign="center" width="30%" padding={10}>
          <Select
            placeholder="Select Employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            mb={4}
          >
            {employees.map((employee) => (
              <option key={employee.employee_name} value={employee.employee_name}>
                {employee.employee_name}
              </option>
            ))}
          </Select>

          <Input
            placeholder="Enter Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            mb={4}
          />

          <CurrentItemDisplay currentItem={currentItem} />
          <OrderDisplay order={order} onRemoveFromOrder={handleRemoveFromOrder} />
        </Box>

        <Box textAlign="center" width="65%" pt="5vh">
          <Grid templateColumns="repeat(4, 1fr)" gap="3">
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
            <GridItem>
              <Button colorScheme="blue" onClick={handleSubmitOrder}>
                Submit Order
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
              } else if (item.item_type === "drink") {
                handleSelectDrink(item.name);
              } else if (item.item_type === "appetizer") {
                handleSelectAppetizer(item.name);
              }
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
