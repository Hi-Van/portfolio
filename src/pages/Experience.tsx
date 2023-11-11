import {
  Box,
  Divider,
  Heading,
  Text,
  Image,
  useMediaQuery,
  Tag,
} from "@chakra-ui/react";
import metalogo from "../assets/meta.jpg";
import syflogo from "../assets/syf.jpg";
import epclogo from "../assets/epc.jpg";
import walmartlogo from "../assets/wgt.jpg";
import headline from "../assets/fb-rooftop.jpg";
import { Job, JobType } from "../components/job";

export const Experience = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const syf: JobType = {
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

  const meta: JobType = {
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

  const epc: JobType = {
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
      "Implemented new CI/CD testing and version control procedures, increasing testing coverage by 17%",
    ],
  };

  const walmart: JobType = {
    url: "https://tech.walmart.com/content/walmart-global-tech/en_us/about.html",
    image: walmartlogo,
    company: "Walmart Global Tech",
    position: "Software Engineer",
    location: "Bentonville, AR",
    timeline: "Aug 2023 - Current",
    tags: [{ color: "purple", text: "Fulltime" }],
    description: [
      "Created UI workflows servicing 10,500+ stores internationally",
      "Developed API queries capable of handling 470,000 requests per second",
      "Optimized category editing process, reducing monthly modular processing by 460 requests per month",
    ],
  };

  const employmentHistory: JobType[] = [walmart, syf, meta, epc];

  const exp = [
    "During my time at Meta, I gained valuable experience in handling large-scale systems and writing high-quality code. Developing data pipelines to support machine learning applications taught me how to effectively design and optimize systems to handle high levels of traffic. Additionally, operating within a large organization like Meta taught me how to collaborate with cross-functional teams and communicate effectively to achieve business goals. These experiences have allowed me to approach problem-solving with a diverse and versatile perspective.",
    "As a Backend Software Engineer Intern at Synchrony Financial, I learned the importance of understanding customer value and how it plays a critical role in prioritizing tasks. I also contributed to the introduction of automated testing, which improved the code quality and reliability of our product. Working with this team allowed me to gain valuable insights into these two critical aspects of software engineering.",
    "At Edgewell Personal Care, I worked as a Systems Engineer Intern. I gained experience in debugging inconsistent code and identifying redundant computations. Working in a lean, start-up-like team allowed me to develop a versatile approach to problem-solving and learn how to work efficiently under tight deadlines. These experiences enabled me to help streamline the complex cloud system for the product database, resulting in significant cost savings for the company. Additionally, I developed a new platform for searching and managing the database, which helped the system handle 20,000 queries per second and generated significant business value.",
  ];

  const skills: string[][] = [
    ["JavaScript", "yellow"],
    ["TypeScript", "twitter"],
    ["HTML/CSS", "purple"],
    ["PHP", "orange"],
    ["Python", "green"],
    ["Java", "purple"],
    ["C++", "orange"],
    ["C", "red"],
    ["Kotlin", "blue"],
    ["Dart", "green"],
    ["mySQL", "pink"],
    ["Git", "purple"],
    ["Mercurial", "cyan"],
    ["Pytorch", "yellow"],
    ["React", "blue"],
    ["Flutter", "pink"],
    ["Hacklang", "red"],
    ["GraphQL", "teal"],
    ["AWS (Amazon Web Services)", "purple"],
    ["Azure", "green"],
    ["Heroku", "blue"],
    ["GitHub Pages", "pink"],
    ["Firebase", "orange"],
    ["Jira", "yellow"],
    ["Figma", "purple"],
  ];
  return (
    <Box minH="fit-content" my={isLargerThan800 ? 16 : 12}>
      <Image src={headline} borderRadius={4} />
      <Text mt={2} color="gray.500" fontSize={isLargerThan800 ? "md" : "sm"}>
        A rooftop photo of one of the office buildings at Meta. It had a rooftop
        garden and was a great place to work.
      </Text>
      <Heading
        textAlign={isLargerThan800 ? "left" : "center"}
        mt={12}
        mb={4}
        size={isLargerThan800 ? "xl" : "lg"}
      >
        I've got some experience...
      </Heading>
      <Divider mb={8} />

      {exp.map((paragraph) => (
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
        Skills
      </Heading>
      <Divider mb={8} />
      {skills.map((pair: string[]) => (
        <Tag
          colorScheme={pair[1]}
          m={1}
          size={"md"}
          key={crypto.randomUUID()}
          fontWeight={"normal"}
        >
          {pair[0]}
        </Tag>
      ))}

      <Heading
        textAlign={isLargerThan800 ? "left" : "center"}
        mt={20}
        mb={4}
        size={isLargerThan800 ? "xl" : "lg"}
      >
        Work History
      </Heading>
      <Divider mb={-8} />

      {employmentHistory.map((obj: JobType) => (
        <Job job={obj} key={crypto.randomUUID()} />
      ))}
    </Box>
  );
};
