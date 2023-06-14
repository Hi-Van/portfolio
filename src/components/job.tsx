import {
  Box,
  Center,
  Heading,
  VStack,
  Flex,
  Image,
  UnorderedList,
  ListItem,
  Spacer,
  Icon,
  Link,
  Tag,
  useMediaQuery,
} from "@chakra-ui/react";
import { Landmark } from "lucide-react";

const desktopVariant = (job: any): JSX.Element => {
  return (
    <Box my={24} w={"100%"}>
      <Flex my={6}>
        <Link isExternal href={job.url}>
          <Image
            alt="company logo"
            src={job.image}
            h={"14"}
            border={"1px"}
            borderColor={"#E7E7EF"}
            borderRadius={"15%"}
            mx={4}
          />
        </Link>
        <VStack flex={"1"}>
          <Flex w={"100%"}>
            <Heading size="md" fontWeight={"semibold"}>
              {job.position}
            </Heading>
            <Spacer />
            <Center>
              <Icon as={Landmark} mx={2} />
              <Heading size="md" fontWeight={"semibold"}>
                {job.location}
              </Heading>
            </Center>
          </Flex>
          <Flex w={"100%"} color="#8985AD" alignItems={"center"}>
            <Heading size="md" fontWeight={"normal"}>
              {job.company}
            </Heading>
            {job.tags.map((obj: any) => (
              <Tag
                colorScheme={obj.color}
                ml={2}
                size={"sm"}
                key={crypto.randomUUID()}
              >
                {obj.text}
              </Tag>
            ))}
            <Spacer />
            <Heading size="sm" fontWeight={"normal"}>
              {job.timeline}
            </Heading>
          </Flex>
        </VStack>
      </Flex>
      <UnorderedList ml={12}>
        {job.description.map((item: string): JSX.Element => {
          return (
            <ListItem
              key={crypto.randomUUID()}
              color="#5F5A86"
              fontFamily="poppins"
            >
              {item}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

const mobileVariant = (job: any): JSX.Element => {
  return (
    <Box my={24} w={"100%"}>
      <Flex my={6}>
        <Link isExternal href={job.url}>
          <Image
            alt="company logo"
            src={job.image}
            h={"14"}
            border={"1px"}
            borderColor={"#E7E7EF"}
            borderRadius={"15%"}
            mx={4}
          />
        </Link>
        <VStack flex={"1"}>
          <Flex w={"100%"} alignItems={"left"} direction={"column"}>
            <Heading size="md" fontWeight={"semibold"}>
              {job.position}
            </Heading>
            <Heading size="sm" fontWeight={"normal"} color="#8985AD">
              {job.company}
            </Heading>
            <Heading size="xs" fontWeight={"normal"} w={"100%"} color="#8985AD">
              {job.timeline}
            </Heading>
            <Flex w={"100%"} color="#8985AD" mt={1}>
              <Icon as={Landmark} mr={1} />
              <Heading size="xs" fontWeight={"normal"}>
                {job.location}
              </Heading>
            </Flex>
          </Flex>

          <Flex w={"100%"}>
            {job.tags.map((obj: any) => (
              <Tag
                colorScheme={obj.color}
                mr={2}
                size={"sm"}
                key={crypto.randomUUID()}
              >
                {obj.text}
              </Tag>
            ))}
          </Flex>
        </VStack>
      </Flex>
      <UnorderedList ml={12}>
        {job.description.map((item: string): JSX.Element => {
          return (
            <ListItem
              key={crypto.randomUUID()}
              color="#5F5A86"
              fontFamily="poppins"
              fontSize={"sm"}
              my={1}
            >
              {item}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export const Job = ({ job }: any): JSX.Element => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  if (isLargerThan800) {
    return desktopVariant(job);
  } else {
    return mobileVariant(job);
  }
};
