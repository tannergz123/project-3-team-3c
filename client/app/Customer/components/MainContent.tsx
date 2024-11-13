// Customer/components/MainContent.tsx

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import EntreeSizeSelector from './EntreeSizeSelector';
import AppetizerSelector from './AppetizerSelector';

interface MainContentProps {
  selectedCategory: string;
}

const MainContent: React.FC<MainContentProps> = ({ selectedCategory }) => {
  if (selectedCategory === "Entrees") {
    return <EntreeSizeSelector />;
  } else if (selectedCategory === "Appetizers") {
    return <AppetizerSelector />;
  }

  // Placeholder for Drinks or if no valid category is selected
  return (
    <Box>
      <Text fontSize="lg" color="gray.600">Select a category to see options</Text>
    </Box>
  );
};

export default MainContent;
