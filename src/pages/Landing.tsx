import {
  Button,
  Center,
  Code,
  Heading,
  Icon,
  VStack,
  useMediaQuery,
  Text,
  StackDivider,
  Stack,
  Box,
} from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Landing = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <VStack minH="fit-content" spacing={4} my={isLargerThan800 ? 48 : 32}>
      <Heading
        fontFamily="poppins"
        size={isLargerThan800 ? "4xl" : "3xl"}
        fontWeight={"semibold"}
        textAlign={"center"}
      >
        <span style={{ color: "#6552F5" }}>Van</span>ouphon{" "}
        <span style={{ color: "#6552F5" }}>S</span>irisouk
        <span style={{ color: "#6552F5" }}>.</span>
      </Heading>
      <Heading
        fontWeight={"medium"}
        size={isLargerThan800 ? "lg" : "sm"}
        textAlign={"center"}
      >
        <span style={{ color: "#6552F5" }}>Human</span> visualizing{" "}
        <Code
          fontSize={"inherit"}
          fontWeight={"normal"}
          color="#6552F5"
          background="#6552f53b"
          borderRadius={4}
        >
          1&0
        </Code>{" "}
        for other humans
        <span style={{ color: "#6552F5" }}>.</span>
      </Heading>
      <Center my={4} color="#5F5A86">
        <Icon as={MapPin} mx={2} />
        <Heading size={isLargerThan800 ? "md" : "xs"} fontWeight={"normal"}>
          Bentonville, AR
        </Heading>
      </Center>
      <Heading
        size={isLargerThan800 ? "md" : "sm"}
        fontWeight={"normal"}
        maxW="480px"
        textAlign={"center"}
        color="#5F5A86"
      >
        Software Engineer at Walmart Global Tech, connecting people to
        products🌐
      </Heading>

      <Button
        bgColor={"gray.900"}
        color={"white"}
        _hover={{ transform: "translateY(-2px)" }}
        _active={{}}
        rightIcon={<Icon as={FaArrowRight} />}
        size={isLargerThan800 ? "lg" : "md"}
        boxShadow={"md"}
        as={Link}
        to={"/about"}
        mt={20}
      >
        Let's Go
      </Button>

      {isLargerThan800 ? (
        <Stack my={8} direction={"row"} spacing={20} divider={<StackDivider />}>
          <Box
            display="flex"
            flexDirection="column"
            width={"fit-content"}
            maxWidth={"240px"}
          >
            <Text color={"gray.400"}>
              Software Engineer, I focus on improving data accessibility,
              transparency, and consumption for users.
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width={"1fr"}
            maxWidth={"240px"}
          >
            <Text color={"gray.400"}>
              Web design enthusiast, I enjoy creating beautiful and functional
              spaces.
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width={"1fr"}
            maxWidth={"240px"}
          >
            <Text color={"gray.400"}>
              Part-time nerd, currently diving into live-collaboration and
              multiplayer technology.
            </Text>
          </Box>
        </Stack>
      ) : null}
    </VStack>
  );
};
