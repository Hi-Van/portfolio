import {
  Box,
  Divider,
  Heading,
  Text,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import headline from "../assets/ny-skyline.jpg";

export const About = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const about = [
    "Hi, I'm Van, a recent graduate of the University of Connecticut with a bachelor's degree in Computer Science. I currently reside in Bentonville as a Software Engineer at Walmart Global Tech, where I'm busy connecting people with products.",
    "Before this, I taught technical skills at the Google Student Developer Club and served as Vice President of the Competitive Programming Club. I've worked on various projects across different industries, including Full Stack Machine Learning data visualization at Meta AI, Account Notifications and Enrollment at Synchrony Financial, and ensuring Access DB reliability at Edgewell Personal Care.",
    "As a software engineer, I am a generalist who also specializes in creating elegant solutions that prioritize user experience and efficient management of vast amounts of data in large-scale systems. Recently, I've been exploring topics such as frontend optimization for underdeveloped networks, implementation of live collaboration using CRDTs, and long-term memory using vector databases for machine learning.",
    "In my free time, I enjoy researching new trends in interior and web design. I experiment with color palettes to create beautiful and functional spaces and websites. I also love testing out new technology and tools to bring my designs to life. Oftentimes, I find myself looking for inspiration on Dribbble and Behance.",
  ];

  return (
    <Box minH="fit-content" my={isLargerThan800 ? 16 : 12}>
      <Image src={headline} borderRadius={4} />
      <Text mt={2} color="gray.500" fontSize={isLargerThan800 ? "md" : "sm"}>
        A photo of NYC. I used to live here during my internship and it was
        amazing. I'm hoping to move back as fast as possible.
      </Text>
      <Heading
        textAlign={isLargerThan800 ? "left" : "center"}
        mt={12}
        mb={4}
        size={isLargerThan800 ? "xl" : "lg"}
      >
        Hello again, stranger...
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
    </Box>
  );
};
