"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [signInError, setSignInError] = useState<string | null>(null); // State for error messages
  const [permissionLevel, setPermissionLevel] = useState<string | null>(null); // State for permission levels
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter();

  const fetchScopeData = async (token: string) => {
    setLoading(true);
    setSignInError(null); // Clear previous errors
    try {
      const response = await axios.get(
        "https://project-3-team-3c.onrender.com/auth/get-scope",
        { params: { token } }
      );

      const role = response.data;
      if (role === "E") {
        setPermissionLevel("Employee");
      } else if (role === "EM") {
        setPermissionLevel("Master");
      } else if (role === "M") {
        setPermissionLevel("Manager");
      } else {
        throw new Error("Unexpected role response");
      }
    } catch (error) {
      console.error("Error fetching permission level:", error);
      setSignInError("Failed to fetch permission level. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = (credentialResponse: any) => {
    const token = credentialResponse.credential; // Get ID token from Google
    fetchScopeData(token);
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

        {/* Google Login Button */}
        <VStack spacing={4}>
          <GoogleLogin
            onSuccess={handleSignIn}
            onError={() => setSignInError("Login failed. Please try again.")}
          />
        </VStack>

        {/* Display Permission Level or Loading Spinner */}
        <Box mt={6}>
          {loading ? (
            <Spinner size="lg" />
          ) : permissionLevel ? (
            <Text fontSize="lg" color="green.600">
              Permission Level: {permissionLevel}
            </Text>
          ) : null}
        </Box>

        {/* Redirect Button (if permission is fetched successfully) */}
        {permissionLevel && (
          <Button
            mt={4}
            colorScheme="red"
            onClick={() => router.push("/Cashier")}
          >
            Proceed to Dashboard
          </Button>
        )}
      </Box>
    </Box>
  );
}
