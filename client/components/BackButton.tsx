"use client";

import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      colorScheme="orange"
      variant="outline"
      onClick={() => router.back()}
    >
      Back
    </Button>
  );
};

export default BackButton;