"use client";

import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Header from "./components/Header";
import CategorySelector from "./components/CategorySelector";
import MainContent from "./components/MainContent";

export default function CustomerPage() {
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);

  return (
    <Box>
      {/* Pass the selected category to the header as the title */}
      <Header title={selectedCategory || "Customer Ordering"} />
      <Flex mt={6} px={4}>
        {/* Category Selector on the Left */}
        <Box width="20%">
          <CategorySelector />
        </Box>

        {/* Main Content Area on the Right */}
        <Box width="80%" pl={8}>
          <MainContent />
        </Box>
      </Flex>
    </Box>
  );
}