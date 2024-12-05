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

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  isCartPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Customer Ordering",
  showBackButton = false,
  onBack,
  isCartPage = false,
}) => {
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
        {/* Left Section: Back Button or Logo */}
        {showBackButton ? (
          <Button
            onClick={onBack}
            variant="ghost"
            color="white"
            position="absolute"
            left="16px"
          >
            &#8592; Back
          </Button>
        ) : (
          <Box display="flex" alignItems="center" position="absolute" left="16px">
            <Box bg="white" borderRadius="full" p={1}>
              <Image src="/static/logo.png" alt="Logo" boxSize="40px" />
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
          whiteSpace="nowrap"
        >
          {title}
        </Heading>

        {/* Right Section: Globe and Cart */}
        <Box display="flex" alignItems="center" gap={4} position="absolute" right="16px">
          {/* Translation Globe Icon */}
          <IconButton
            aria-label="Translate Page"
            icon={<FaGlobe />}
            colorScheme="blackAlpha"
            onClick={toggleGoogleTranslate}
          />
          {/* Cart Button */}
          {!isCartPage && (
            <Button
              colorScheme="blackAlpha"
              variant="solid"
              onClick={() => router.push("/Customer/Cart")}
            >
              Cart <Badge ml="1" colorScheme="whiteAlpha">{cartCount}</Badge>
            </Button>
          )}
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
          right: "16px", // Align under the right section
          zIndex: 10, // Lower than the header
        }}
      ></Box>
    </Box>
  );
};

export default Header;