import {
  Box,
  Divider,
  Heading,
  Text,
  Image,
  useMediaQuery,
  Stack,
  Center,
} from "@chakra-ui/react";
import { Project, ProjectType } from "../components/project";
import headline from "../assets/street-lamp.jpg";
import puzzl from "../assets/puzzl.jpeg";
import preeepare from "../assets/preeepare.jpeg";

export const Projects = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const about = [
    "Through my previous experiences, I have developed and enhanced my software engineering and problem-solving skills. These skills have allowed me to approach problem-solving in various ways, which is essential in the field of software engineering. I strongly believe that having a versatile perspective is an advantage when tackling different types of problems, which is why I often choose to explore topics on my own.",
    "Currently, I am interested in exploring data visualization to create more value around data. From my experience, I believe that visualization can be a powerful tool in understanding complex data sets and making them more accessible to a broader audience. I am excited about creating projects that can present data in an easy-to-understand format and can be shared with others.",
    "I’m also interested in live collaboration and multiplayer software, as well as the mathematics behind CRDT-based real-time collaboration algorithms. In large organizations, effective communication and collaboration are crucial, and live collaboration software can improve team efficiency regardless of location. I aim to create seamless collaboration software to help people achieve their objectives. With my experience in handling large-scale systems and optimizing them for high traffic, I have gained insight into the mathematics behind CRDT-based real-time collaboration algorithms. I hope to further my understanding of the math and use my skills to create better real-time collaboration systems.",
  ];

  const Preeepare: ProjectType = {
    image: preeepare,
    name: "Preeepare",
    description:
      "Preeepare is a solution for students who want to excel in their studies. It uses visual charts to help track progress in different areas of study and identify areas that need more attention. This helps promote knowledge diversity and encourages topic depth by visualizing progress. With Preeepare, students can confidently take control of their learning journey and visualize their path to success.",
    technologies: [
      ["React", "blue"],
      ["Google Sheets", "green"],
      ["Material UI", "purple"],
      ["Chart.js", "pink"],
    ],
    link: "https://hi-van.github.io/preeepare/",
  };

  const Puzzl: ProjectType = {
    image: puzzl,
    name: "Puzzl",
    description:
      "Puzzl is a drag-and-drop editor that enables programmers to create complex algorithms using logical steps and pseudocode. Puzzl facilitates real-time collaboration among teams, making it easy to work together and share ideas. Whether you're working on a group project or need to organize your thoughts, Puzzl is the perfect solution.",
    technologies: [
      ["React", "blue"],
      ["Chakra UI", "teal"],
      ["Firebase", "orange"],
      ["Stripe", "purple"],
      ["TipTap", "pink"],
    ],
    link: null,
  };

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

      <Center minH={"fit-content"}>
        <Stack
          mt={20}
          direction={isLargerThan800 ? "row" : "column"}
          spacing={20}
          alignItems={"start"}
        >
          <Project project={Puzzl} />
          <Project project={Preeepare} />
        </Stack>
      </Center>
    </Box>
  );
};
