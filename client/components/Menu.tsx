// pages/menu.js or in any parent component
"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import MenuItem from "../components/MenuItem";

function Menu() {
  const pandaMenuItems = [
    { name: "Orange Chicken", price: 7.99, description: "Tangy and spicy chicken." },
    { name: "Kung Pao Chicken", price: 8.99, description: "Spicy stir-fried chicken." },
    { name: "Beef Broccoli", price: 9.49, description: "Beef with fresh broccoli." },
  ];

  return (
    <VStack spacing="6">
      {pandaMenuItems.map((item, index) => (
        <MenuItem
          key={index}
          name={item.name}
          price={item.price}
          description={item.description}
          onAddToOrder={() => console.log(`Added ${item.name} to order`)}
        />
      ))}
    </VStack>
  );
}

export default Menu;
