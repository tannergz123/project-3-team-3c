// Customer/components/Header.tsx

import React from 'react';
import { Box, Heading, Button, Badge, Image } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg="red.600"          // Panda-themed red background
      color="white"          // White text color
    >
      {/* Panda Express Logo */}
      <Box display="flex" alignItems="center">
        <Box
          bg="white"                  // White background for the circular container
          borderRadius="full"         // Makes the container circular
          p={1}                       // Padding to create space around the logo image
          mr={3}                      // Margin-right for spacing from the title
        >
          <Image src="/static/logo.png" alt="Panda Express Logo" boxSize="40px" />
        </Box>
        <Heading size="md">Customer Ordering</Heading>
      </Box>

      {/* Cart Button Placeholder */}
      <Button colorScheme="blackAlpha" variant="solid">
        Cart <Badge ml="1" colorScheme="whiteAlpha">3</Badge>
      </Button>
    </Box>
  );
};

export default Header;
