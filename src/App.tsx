import {
  Box,
  Center,
  Heading,
  VStack,
  Code,
  Icon,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavigationMenu } from "./components/navigation";
import { MapPin } from "lucide-react";
import { Job } from "./components/job";
import metalogo from "./assets/meta.jpg";
import syflogo from "./assets/syf.jpg";
import epclogo from "./assets/epc.jpg";
import walmartlogo from "./assets/wgt.jpg";

function App() {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const syf = {
    url: "https://www.synchrony.com/for-businesses.html#about-us",
    image: syflogo,
    company: "Synchrony Financial",
    position: "Software Engineer",
    location: "Stamford, CT",
    timeline: "Sept 2022 - May 2023",
    tags: [
      { color: "orange", text: "Internship" },
      { color: "green", text: "Backend" },
    ],
    description: [
      "Implemented and configured email, text, and push notifications for 1,000,000+ accounts",
      "Integrated automated tests for enrollment detection into CI/CD pipeline, improving code coverage by 26%",
    ],
  };

  const meta = {
    url: "https://about.meta.com/",
    image: metalogo,
    company: "Meta",
    position: "Software Engineer",
    location: "New York, NY",
    timeline: "May 2022 - Aug 2022",
    tags: [
      { color: "orange", text: "Internship" },
      { color: "blue", text: "Fullstack" },
    ],
    description: [
      "Created API data pipelines serving PyTorch Machine Learning data for content categorization on Facebook and Instagram withstanding 600,000 queries per second",
      "Improved efficiency for calculating machine learning chart visualizations by 350%",
      "Optimized final build module size to 33% of original module size",
    ],
  };

  const epc = {
    url: "https://edgewell.com/pages/about-us",
    image: epclogo,
    company: "Edgewell Personal Care",
    position: "Systems Engineer",
    location: "Milford, CT",
    timeline: "May 2021 - July 2021",
    tags: [
      { color: "orange", text: "Internship" },
      { color: "yellow", text: "Systems" },
    ],
    description: [
      "Identified redundancy in cloud system for product database, reducing annual cost by $14000+",
      "Developed internal search and management platform supporting 20,000 queries per second",
      "Implemented new CI/CD testing and version control procedures, increasing testing coverage by 17%",
    ],
  };

  const walmart = {
    url: "https://tech.walmart.com/content/walmart-global-tech/en_us/about.html",
    image: walmartlogo,
    company: "Walmart Global Tech",
    position: "Software Engineer",
    location: "Bentonville, AR",
    timeline: "Aug 2023 - Current",
    tags: [
      { color: "purple", text: "Fulltime" },
      { color: "pink", text: "Incoming" },
    ],
    description: [],
  };

  const about = [
    "Hi, I'm Van, a recent graduate of the University of Connecticut with a bachelor's degree in Computer Science. I currently reside in Bentonville and help people improve their internet experience by enhancing software. I'll soon be joining Walmart Global Tech, where I'll work on connecting people with products.",
    "Before this, I taught technical skills at the Google Student Developer Club and served as Vice President of the Competitive Programming Club. I've worked on various projects across different industries, including Full Stack Machine Learning data visualization at Meta AI, Account Notifications and Enrollment at Synchrony Financial, and ensuring Access DB reliability at Edgewell Personal Care.",
    "As a software engineer, I am a generalist who also specializes in creating elegant solutions that prioritize user experience and efficient management of vast amounts of data in large-scale systems. Recently, I've been exploring topics such as frontend optimization for underdeveloped networks, implementation of live collaboration using CRDTs, and long-term memory using vector databases for machine learning.",
    "In my free time, I enjoy researching new trends in interior and web design. I experiment with color palettes to create beautiful and functional spaces and websites. I also love testing out new technology and tools to bring my designs to life, often finding inspiration on Dribbble and Behance.",
  ];

  const employmentHistory = [walmart, syf, meta, epc];

  return (
    <Box minHeight="100vh">
      <NavigationMenu />
      <Center>
        <Box minH={"fit-content"} maxWidth={"1000px"} m={4}>
          <VStack mt={12}>
            <VStack minH="fit-content" spacing={4} my={isLargerThan800 ? 48 : 32}>
            <Heading fontFamily="poppins" size={ isLargerThan800 ? "4xl" : "3xl"} fontWeight={"semibold"} textAlign={"center"}>
              <span style={{ color: "#6552F5" }}>Van</span>ouphon{" "}
              <span style={{ color: "#6552F5" }}>S</span>irisouk
              <span style={{ color: "#6552F5" }}>.</span>
            </Heading>
            <Heading fontWeight={"medium"} size={isLargerThan800 ? "lg" : "sm"}>
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
              Incoming Software Engineer at Walmart Global Tech, connecting
              people to products🌐
            </Heading>
            </VStack>

            <Box minH="fit-content" my={16}>
              <Heading textAlign={isLargerThan800 ? "left" : "center"} my={8} size={ isLargerThan800 ? "xl" : "lg"}>
               Hello again, stranger...
              </Heading>
              {about.map((paragraph) => (
                <Text fontSize={ isLargerThan800 ? "lg" : "md"} my={4} key={crypto.randomUUID()} color="#5F5A86">
                  {paragraph}
                </Text>
              ))}
            </Box>

            <Box minH="fit-content" my={16}>
              <Heading textAlign={isLargerThan800 ? "left" : "center"} size={ isLargerThan800 ? "xl" : "lg"}>
                I've got some experience...
              </Heading>
              {employmentHistory.map((obj) => (
                <Job job={obj} key={crypto.randomUUID()} />
              ))}
            </Box>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}

export default App;
