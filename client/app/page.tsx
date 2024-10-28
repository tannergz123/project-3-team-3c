import {
  Box,
} from "@chakra-ui/react"
// import menu item
import MenuItem from "../components/MenuItem"
import Menu from "../components/Menu"

export default async function Page() {
  return (
    <Box textAlign="center" fontSize="xl" pt="30vh">
      <h1>Hello World</h1>
      <Menu />
    </Box>
  )
}
