import {
  Box,
  Divider,
  Heading,
  Text,
  Image,
  useMediaQuery,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import headline from "../assets/street-lamp.jpg";

export const Projects = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const about = [
    "Through my previous experiences, I have developed and enhanced my software engineering and problem-solving skills. These skills have allowed me to approach problem-solving in various ways, which is essential in the field of software engineering. I strongly believe that having a versatile perspective is an advantage when tackling different types of problems, which is why I often choose to explore topics on my own.",
    "Currently, I am interested in exploring data visualization to create more value around data. From my experience, I believe that visualization can be a powerful tool in understanding complex data sets and making them more accessible to a broader audience. I am excited about creating projects that can present data in an easy-to-understand format and can be shared with others.",
    "I’m also interested in live collaboration and multiplayer software, as well as the mathematics behind CRDT-based real-time collaboration algorithms. In large organizations, effective communication and collaboration are crucial, and live collaboration software can improve team efficiency regardless of location. I aim to create seamless collaboration software to help people achieve their objectives. With my experience in handling large-scale systems and optimizing them for high traffic, I have gained insight into the mathematics behind CRDT-based real-time collaboration algorithms. I hope to further my understanding of the math and use my skills to create better real-time collaboration systems.",
  ];

  return (
    <Box minH="fit-content" my={isLargerThan800 ? 16 : 12}>
      <Image src={headline} borderRadius={4} />
      <Text mt={2} color="gray.500" fontSize={isLargerThan800 ? "md" : "sm"}>
        Point-of-view : You're outside around the time I typically work on my
        projects 🙂
      </Text>
      <Heading
        textAlign={isLargerThan800 ? "left" : "center"}
        mt={12}
        mb={4}
        size={isLargerThan800 ? "xl" : "lg"}
      >
        I make some cool stuff...
      </Heading>
      <Divider size={"md"} mb={8} />
      {about.map((paragraph) => (
        <Text
          fontSize={isLargerThan800 ? "lg" : "md"}
          my={6}
          key={crypto.randomUUID()}
          color="#5F5A86"
        >
          {paragraph}
        </Text>
      ))}

      <Heading
        textAlign={isLargerThan800 ? "left" : "center"}
        mt={20}
        mb={4}
        size={isLargerThan800 ? "xl" : "lg"}
      >
        Showcase
      </Heading>
      <Divider mb={8} />

        <Stack mt={20} direction={isLargerThan800 ? "row" : "column"} spacing={20} divider={<StackDivider />}>
          <Box
            display="flex"
            flexDirection="column"
            width={"fit-content"}
            maxWidth={"240px"}
          >
            <Image src={"https://i.imgur.com/2Z3Q1ZM.png"} borderRadius={4} />
            <Text color={"gray.400"}>
              Puzzl - Empowering Problem-Solvers
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width={"fit-content"}
            maxWidth={"240px"}
          >
            <Image src={"https://i.imgur.com/2Z3Q1ZM.png"} borderRadius={4} />
            <Text color={"gray.400"}>
              Cloudy - Word Cloud Generator
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width={"fit-content"}
            maxWidth={"240px"}
          >
            <Image src={"https://i.imgur.com/2Z3Q1ZM.png"} borderRadius={4} />
            <Text color={"gray.400"}>
              Preeepare - Knowledge hub for students
            </Text>
          </Box>
        </Stack>
      
    </Box>
  );
};
