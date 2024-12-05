import React from "react";
import {
  Box,
  Heading,
  Button,
  Badge,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../store/store";

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.order.items);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const router = useRouter();

  const toggleGoogleTranslate = () => {
    const translateElement = document.getElementById("google_translate_element");
    if (translateElement) {
      translateElement.style.visibility =
        translateElement.style.visibility === "hidden" ? "visible" : "hidden";
    }
  };

  return (
    <Box position="relative" zIndex={10}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        bg="red.600"
        color="white"
        height="64px"
        position="relative"
        zIndex={20} // Ensure the header is above the Google Translate widget
        boxShadow="md"
      >
        {/* Left Section: Logo */}
        <Box display="flex" alignItems="center">
          <Box bg="white" borderRadius="full" p={1}>
            <Image src="/static/logo.png" alt="Logo" boxSize="40px" />
          </Box>
        </Box>

        {/* Title */}
        <Heading size="md" textAlign="center" flex="1" whiteSpace="nowrap">
          Customer Ordering
        </Heading>

        {/* Right Section: Globe and Cart */}
        <Box display="flex" alignItems="center" gap={4}>
          {/* Translation Globe Icon */}
          <IconButton
            aria-label="Translate Page"
            icon={<FaGlobe />}
            colorScheme="blackAlpha"
            onClick={toggleGoogleTranslate}
          />
          {/* Cart Button */}
          <Button
            colorScheme="blackAlpha"
            variant="solid"
            onClick={() => router.push("/Customer/Cart")}
          >
            Cart <Badge ml="1" colorScheme="whiteAlpha">{cartCount}</Badge>
          </Button>
        </Box>
      </Box>

      {/* Google Translate Element */}
      <Box
        id="google_translate_element"
        style={{
          visibility: "hidden", // Initially hidden
          backgroundColor: "#f1f1f1",
          padding: "8px",
          borderRadius: "5px",
          position: "absolute",
          top: "64px", // Position directly below the header
          left: "16px", // Optional: adjust placement as needed
          zIndex: 10, // Lower than the header
        }}
      ></Box>
    </Box>
  );
};

export default Header;