import {
  Box,
  Button,
  Checkbox,
  ClientOnly,
  HStack,
  Heading,
  Progress,
  RadioGroup,
  Skeleton,
  VStack,
} from "@chakra-ui/react"
import Image from "next/image"
import { ColorModeToggle } from "../components/color-mode-toggle"

export default async function Page() {
  return (
    <Box textAlign="center" fontSize="xl" pt="30vh">
      <h1>Hello World</h1>
    </Box>
  )
}
