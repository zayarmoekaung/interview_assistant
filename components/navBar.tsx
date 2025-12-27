import { Flex, Spacer} from "@chakra-ui/react"
import {MenuDrawer} from "./menuDrawer";
export const NavBar = () => {
    return (
        <Flex as="nav" align="space-between" padding="1.5rem" position="sticky" top="0" bg="none" zIndex="45" w="vw" h="80px">
            <div className="text-xl font-bold">Mafuru</div>
            <Spacer />
            <MenuDrawer />
        </Flex>
    )
}