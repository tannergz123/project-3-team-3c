"use client";

import { useState } from "react";
import { Box, Button, Heading, VStack, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [signInError, setSignInError] = useState<string | null>(null); // State for error message
  const router = useRouter();

  const handleSignIn = () => {
    // Simulate sign-in logic
    const success = true; // Replace with actual authentication logic

    if (!success) {
      setSignInError("Invalid Account. Please try again."); // Set error message
    } else {
      setSignInError(null); // Clear error on successful sign-in
      router.push("/Manager"); // Redirect on success
    }
  };

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
        {/* Logo Section */}
        <Box mb={6}>
          <img
            src="/static/logo.png"
            alt="Panda Express Logo"
            style={{ margin: "0 auto", maxWidth: "150px" }}
          />
        </Box>

        <Heading color="red.600" mb={4} size="lg">
          Welcome Back!
        </Heading>
        <Text color="gray.600" mb={6}>
          Sign in to your Panda Express account using your Google account
        </Text>

        {/* Error Message */}
        {signInError && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {signInError}
          </Alert>
        )}

        <VStack spacing={4}>
          <Button
            colorScheme="red"
            bg="red.600"
            size="lg"
            w="full"
            _hover={{ bg: "red.500" }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </VStack>

      </Box>
    </Box>
  );
}
