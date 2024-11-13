// Customer/components/AppetizerSelector.tsx

import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';

const appetizerOptions = ["Spring Rolls", "Potstickers", "Egg Rolls", "Wontons"];

const AppetizerSelector: React.FC = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {appetizerOptions.map((appetizer) => (
        <GridItem
          key={appetizer}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          textAlign="center"
          boxShadow="md"
          _hover={{ borderColor: "red.600", transform: "scale(1.05)" }}
          transition="all 0.2s"
        >
          <Text fontWeight="bold" color="red.600">{appetizer}</Text>
        </GridItem>
      ))}
    </Grid>
  );
};

export default AppetizerSelector;
