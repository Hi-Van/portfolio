import {
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Divider,
  Text,
  Tag,
  Link,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export type ProjectType = {
  image: string;
  name: string;
  description: string;
  technologies: string[][];
  link: null | string;
};

export const Project = ({ project }: { project: ProjectType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <Button
        onClick={onOpen}
        p={0}
        m={0}
        w={"fit-content"}
        h={"fit-content"}
        maxWidth={"400px"}
        minWidth={"240px"}
        borderRadius={4}
        overflow={"hidden"}
        outline={"solid 1px"}
        outlineColor={"gray.100"}
        boxShadow={"sm"}
      >
        <Image src={project.image} borderRadius={4} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {project.link ? (
              <Link href={project.link} isExternal>
                <Image
                  src={project.image}
                  borderRadius={4}
                  outline={"solid 1px"}
                  outlineColor={"gray.100"}
                  boxShadow={"sm"}
                  my={4}
                />
              </Link>
            ) : (
              <Image
                src={project.image}
                borderRadius={4}
                outline={"solid 1px"}
                outlineColor={"gray.100"}
                boxShadow={"sm"}
                my={4}
                _hover={{ cursor: "pointer" }}
                onClick={() =>
                  toast({
                    title: "Oops!",
                    description:
                      "Project is still under development. Please check back later.",
                    variant: "subtle",
                    status: "error",
                    position: "top",
                    duration: 1000,
                    isClosable: true,
                  })
                }
              />
            )}
            <Heading size={"md"} fontWeight={"semibold"}>
              {project.name}
            </Heading>
            <Divider my={2} />
            <Text mb={8} color={"gray.500"} fontWeight={"light"}>
              {project.description}
            </Text>

            <Heading size={"md"} fontWeight={"semibold"}>
              Technologies
            </Heading>
            <Divider my={2} />

            {project.technologies.map(([text, colorScheme]) => (
              <Tag
                colorScheme={colorScheme}
                m={1}
                size={"md"}
                key={crypto.randomUUID()}
                fontWeight={"normal"}
              >
                {text}
              </Tag>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
