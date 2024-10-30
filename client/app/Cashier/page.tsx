import {
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react"
import Menu from "./components/Menu"
import BackButton from "../../components/BackButton"
import OrderDisplay from "./components/OrderDisplay"

export default async function Page() {
  return (
    // back button in top left corner

    <Box position="relative" fontSize="xl" pt="10vh">
      {/* Back Button positioned in the top left */}
      <Box position="absolute" top="10px" left="10px">
        <BackButton />
      </Box>
        
        {/* Order Display */}
      

      <Flex direction="row" justify="space-between" align="center">
        <Box textAlign={"center"} >
          <Heading as="h2" size="xl" mb={5}>
            Menu
          </Heading>
          <OrderDisplay />
        </Box>

        {/* Centered content */}
        <Box textAlign="center" pt="5vh">
          <Heading as="h1" size="2xl" mb={10}>
            Cashier
          </Heading>
          <Menu />
        </Box>
      </Flex>
    </Box>
  )
}
