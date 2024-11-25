"use client";

import { useState } from "react";
import { Box, Button, Heading, Input, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    // Log input values (or send them to an API)
    console.log("Username:", username);
    console.log("Password:", password);

    // Add your sign-in logic here (e.g., API call)
  };

  const handleSignUp = () => {
    router.push("/SignUp");
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
        {/* Heading */}
        <Heading color="red.600" mb={4} size="lg">
          Welcome Back!
        </Heading>
        <Text color="gray.600" mb={6}>
          Sign in to your Panda Express account
        </Text>
        {/* Sign-in Form */}
        <VStack spacing={4}>
          <Input
            placeholder="Username"
            variant="outline"
            focusBorderColor="red.400"
            value={username} // Bind value to state
            onChange={(e) => setUsername(e.target.value)} // Update state on change
          />
          <Input
            placeholder="Password"
            type="password"
            variant="outline"
            focusBorderColor="red.400"
            value={password} // Bind value to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />
          <Button
            colorScheme="red"
            bg="red.600"
            size="lg"
            w="full"
            _hover={{ bg: "red.500" }}
            onClick={handleSignIn} // Call sign-in logic
          >
            Sign In
          </Button>
        </VStack>
        <Text mt={4} fontSize="sm" color="gray.500">
          Forgot your password?{" "}
          <Button variant="link" color="red.600">
            Reset here
          </Button>
        </Text>
        <Text mt={6} color="gray.600">
          Don’t have an account?{" "}
          <Button variant="link" color="red.600" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Text>
      </Box>
    </Box>
  );
}
