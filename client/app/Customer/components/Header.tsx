import React from 'react';
import { Box, Heading, Button, Badge, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.order.items);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg="red.600"
      color="white"
    >
      {/* Panda Express Logo */}
      <Box display="flex" alignItems="center">
        <Box
          bg="white"
          borderRadius="full"
          p={1}
          mr={3}
        >
          <Image src="/static/logo.png" alt="Panda Express Logo" boxSize="40px" />
        </Box>
        <Heading size="md">Customer Ordering</Heading>
      </Box>

      {/* Cart Button with Navigation */}
      <Link href="/Customer/Cart">
        <Button colorScheme="blackAlpha" variant="solid">
          Cart <Badge ml="1" colorScheme="whiteAlpha">{cartCount}</Badge>
        </Button>
      </Link>
    </Box>
  );
};

export default Header;
