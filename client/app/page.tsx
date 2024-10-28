import {
  Box,
} from "@chakra-ui/react"
import Image from "next/image"
import { AbsoluteCenter } from "@chakra-ui/react"
import Menu from "../components/Menu"

export default async function Page() {
  return (
    <Box textAlign="center" fontSize="xl" pt="10vh">
      <Box display="flex" justifyContent="center" pt="5vh" pb="2vh">
        <Image src="/panda.jpg" alt="Panda" width={300} height={300} />
      </Box>
      <Menu />
    </Box>
  )
}
