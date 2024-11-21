"use client";

import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import MainContent from './components/MainContent';

export default function CustomerPage() {
  return (
    <Box>
      <Header />
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
