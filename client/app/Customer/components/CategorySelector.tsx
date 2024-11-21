import React from 'react';
import { VStack, Box, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { selectCategory } from '../../store/slices/categorySlice';
import { resetSelections } from '../../store/slices/currentSelectionSlice';

const categories = ["Entrees", "Appetizers", "Drinks"];

const CategorySelector: React.FC = () => {
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const handleCategoryChange = (category: string) => {
    dispatch(resetSelections()); // Clear current selections
    dispatch(selectCategory(category)); // Update selected category
  };

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
          onClick={() => handleCategoryChange(category)}
          fontWeight={selectedCategory === category ? "bold" : "normal"}
        >
          {category}
        </Button>
      ))}
    </VStack>
  );
};

export default CategorySelector;