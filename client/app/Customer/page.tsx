// Customer/page.tsx
"use client";
import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import MainContent from './components/MainContent';

export default function CustomerPage() {
  const [selectedCategory, setSelectedCategory] = useState("Entrees");

  return (
    <Box>
      <Header />
      <Flex mt={6} px={4}>
        {/* Category Selector on the Left */}
        <Box width="20%">
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Box>

        {/* Main Content Area on the Right */}
        <Box width="80%" pl={8}>
          <MainContent selectedCategory={selectedCategory} />
        </Box>
      </Flex>
    </Box>
  );
}
