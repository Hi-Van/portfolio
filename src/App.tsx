import { Box, Center, VStack } from "@chakra-ui/react";
import { NavigationMenu } from "./components/navigation";
import { Outlet } from "react-router-dom";
import React from "react";

function App() {

  return (
    <Box>
      <NavigationMenu />
      <Center >
        <Box minH={"fit-content"} maxWidth={"1000px"} m={4}>
          <VStack mt={12}>
            <Outlet />
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}

export default App;
