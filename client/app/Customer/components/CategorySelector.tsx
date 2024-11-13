// Customer/components/CategorySelector.tsx

import React from 'react';
import { VStack, Box, Button } from '@chakra-ui/react';

const categories = ["Entrees", "Appetizers", "Drinks"];

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <VStack align="stretch" spacing={4} position="relative">
      {/* Sliding Indicator */}
      <Box
        position="absolute"
        left="-10px"
        top={`${categories.indexOf(selectedCategory) * 60}px`} // Adjust based on button height
        height="40px"
        width="5px"
        bg="red.600"
        transition="top 0.3s"
        borderRadius="full"
      />

      {/* Category Buttons */}
      {categories.map((category) => (
        <Button
          key={category}
          variant="ghost"
          justifyContent="flex-start"
          colorScheme={selectedCategory === category ? "red" : "gray"}
          onClick={() => onSelectCategory(category)}
          fontWeight={selectedCategory === category ? "bold" : "normal"}
        >
          {category}
        </Button>
      ))}
    </VStack>
  );
};

export default CategorySelector;
