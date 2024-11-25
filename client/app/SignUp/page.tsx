"use client";

import { useState } from "react";
import { Box, Button, Heading, Input, VStack, Text, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleSignInRedirect = () => {
    router.push("/SignIn");
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            variant="outline"
            focusBorderColor="red.400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </VStack>
        <Text mt={6} color="gray.600">
          Already have an account?{" "}
          <Button variant="link" color="red.600" onClick={handleSignInRedirect}>
            Sign In
          </Button>
        </Text>
      </Box>
    </Box>
  );
}
