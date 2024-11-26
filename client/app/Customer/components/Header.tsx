import React from "react";
import { Box, Heading, Button, Badge, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { RootState } from "../../store/store";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  isCartPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBack, isCartPage }) => {
  const cartItems = useSelector((state: RootState) => state.order.items);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const router = useRouter(); // Initialize the router

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg="red.600"
      color="white"
      height="64px" // Fixed height to keep the header consistent
      position="relative"
    >
      {/* Left Section: Back Button or Logo */}
      {showBackButton ? (
        <Button onClick={onBack} variant="ghost" color="white" position="absolute" left="16px">
          &#8592; Back
        </Button>
      ) : (
        <Box display="flex" alignItems="center" position="absolute" left="16px">
          <Box
            bg="white"
            borderRadius="full"
            p={1}
          >
            <Image src="/static/logo.png" alt="Panda Express Logo" boxSize="40px" />
          </Box>
        </Box>
      )}

      {/* Title */}
      <Heading
        size="md"
        textAlign="center"
        flex="1"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        whiteSpace="nowrap" // Prevent text from wrapping
      >
        {title || "Customer Ordering"}
      </Heading>

      {/* Cart Button */}
      {!isCartPage && (
        <Button
          colorScheme="blackAlpha"
          variant="solid"
          onClick={() => router.push("/Customer/Cart")}
          position="absolute"
          right="16px"
        >
          Cart <Badge ml="1" colorScheme="whiteAlpha">{cartCount}</Badge>
        </Button>
      )}
    </Box>
  );
};

export default Header;