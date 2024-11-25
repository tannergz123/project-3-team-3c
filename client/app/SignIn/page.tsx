"use client";

import { useState } from "react";
import { Box, Button, Heading, Input, VStack, Text, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    console.log("Username:", username);
    console.log("Password:", password);
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
        
        <Heading color="red.600" mb={4} size="lg">
          Welcome Back!
        </Heading>
        <Text color="gray.600" mb={6}>
          Sign in to your Panda Express account
        </Text>
        <VStack spacing={4}>
          <Input
            placeholder="Username"
            variant="outline"
            focusBorderColor="red.400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputGroup>
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outline"
              focusBorderColor="red.400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Toggle Password Visibility"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="sm"
                color="gray.500"
              />
            </InputRightElement>
          </InputGroup>
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
