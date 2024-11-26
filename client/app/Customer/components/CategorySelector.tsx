import React from "react";
import { VStack, Box, Button, useColorModeValue, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { selectCategory } from "../../store/slices/categorySlice";
import { resetSelections } from "../../store/slices/currentSelectionSlice";

const categories = ["Entrees", "Appetizers", "Drinks"];

const CategorySelector: React.FC = () => {
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const handleCategoryChange = (category: string) => {
    dispatch(resetSelections()); // Clear current selections
    dispatch(selectCategory(category)); // Update selected category
  };

  const activeBg = useColorModeValue("red.500", "red.600");
  const activeTextColor = useColorModeValue("white", "white");
  const hoverTextColor = useColorModeValue("black", "white"); // Contrast text color for hover
  const tabBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box position="relative" w="full" maxW="300px" mx="auto">
      {/* Tab Background */}
      <Box
        bg={tabBg}
        borderRight="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderRadius="md"
        overflow="hidden"
        py={4}
      >
        {/* Sliding Red Block */}
        <Box
          position="absolute"
          left={0}
          top={`${categories.indexOf(selectedCategory) * 80}px`} // Adjust based on button height and spacing
          height="60px"
          width="100%"
          bg={activeBg}
          borderRadius="md"
          transition="top 0.3s ease"
          zIndex={0}
          mt = "7px"
        />

        {/* Category Buttons */}
        <VStack align="stretch" spacing={4} position="relative" zIndex={1}>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category)}
              bg="transparent"
              color={selectedCategory === category ? activeTextColor : hoverTextColor}
              justifyContent="flex-start"
              fontWeight={selectedCategory === category ? "bold" : "normal"}
              _hover={{
                color: hoverTextColor, // Ensure contrast when hovering
              }}
              _focus={{ boxShadow: "none" }}
              height="60px"
              fontSize="lg"
              px={4}
              transition="color 0.3s ease, font-weight 0.3s ease, background-color 0.3s"
            >
              <Text>{category}</Text>
            </Button>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default CategorySelector;
