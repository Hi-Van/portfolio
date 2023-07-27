import {
  Center,
  Code,
  Heading,
  Icon,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { MapPin } from "lucide-react";

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
      <Center my={6} color="#5F5A86">
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
        Incoming Software Engineer at Walmart Global Tech, connecting people to
        products🌐
      </Heading>
    </VStack>
  );
};
