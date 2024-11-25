"use client";

import { Box, Button, Heading, Input, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <Box
      bgGradient="linear(to-b, red.600, black)"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="xl"
        w={{ base: "90%", md: "400px" }}
        textAlign="center"
      >
        <Heading color="red.600" mb={4} size="lg">
          Create Your Account
        </Heading>
        <Text color="gray.600" mb={6}>
          Sign up to enjoy your Panda Express experience
        </Text>
        <VStack spacing={4}>
          <Input
            placeholder="Username"
            variant="outline"
            focusBorderColor="red.400"
          />
          <Input
            placeholder="Email"
            variant="outline"
            focusBorderColor="red.400"
          />
          <Input
            placeholder="Password"
            type="password"
            variant="outline"
            focusBorderColor="red.400"
          />
          <Button
            colorScheme="red"
            bg="red.600"
            size="lg"
            w="full"
            _hover={{ bg: "red.500" }}
          >
            Sign Up
          </Button>
        </VStack>
        <Text mt={6} color="gray.600">
          Already have an account?{" "}
          <Button
            variant="link"
            color="red.600"
            onClick={() => router.push("/SignIn")}
          >
            Sign In
          </Button>
        </Text>
      </Box>
    </Box>
  );
}
