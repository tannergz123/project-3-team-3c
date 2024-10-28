// app/page.tsx
"use client";

import { Box, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Array of navigation items
  const navItems = [
    { title: "Cashier", path: "/Cashier" },
    { title: "Customer", path: "/Customer" },
    { title: "Manager", path: "/Manager" },
    { title: "Menu Board", path: "/MenuBoard" },
  ];

  return (
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="3xl" mb={10} fontWeight="bold">
        Select a Page
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {navItems.map((item) => (
          <Box
            key={item.title}
            as="button"
            onClick={() => router.push(item.path)}
            p={10}
            borderRadius="lg"
            boxShadow="md"
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            textAlign="center"
            cursor="pointer"
          >
            <Text fontSize="2xl" fontWeight="semibold">
              {item.title}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
