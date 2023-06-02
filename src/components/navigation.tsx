import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Image,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { ChevronDown, Linkedin, Mail } from "lucide-react";
import navlogo from "../assets/nav-name.svg";

export const NavigationMenu = () => {
  const toast = useToast();
  const sections = ["About", "Experience", "Projects"];
  const contacts = [
    {
      name: "Email",
      address: "contact@vansiriso.uk",
      icon: <Mail size={16} />,
    },
    {
      name: "LinkedIn",
      address: "https://www.linkedin.com/in/van-s/",
      icon: <Linkedin size={16} />,
    },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        description: "Copied to Clipboard!",
        variant: "subtle",
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in copying to clipboard! Please try again!",
        variant: "subtle",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <Box h={"fit-content"}>
      <Flex alignItems={"center"} p={2}>
        <Image src={navlogo} alt="vanouphon sirisouk" />
        <Spacer />
        <Breadcrumb spacing={4} separator="" px={8}>
          {sections.map((section) => {
            return (
              <BreadcrumbItem>
                <BreadcrumbLink color="#5F5A86" fontSize={"lg"} >
                  {section}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
        <Menu>
          <MenuButton
            as={Button}
            fontWeight={"medium"}
            rightIcon={<ChevronDown size={16} />}
            color="white"
            colorScheme="purple"
            background={"#6552F5"}
            _hover={{ transform: "translateY(-2px)" }}
            _active={{}}
            size="sm"
          >
            Contact
          </MenuButton>
          <MenuList minW="fit-content">
            {contacts.map((obj) => {
              return (
                <MenuItem
                  fontSize="sm"
                  icon={obj.icon}
                  onClick={() => copyToClipboard(obj.address)}
                >
                  {obj.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>
      <Divider />
    </Box>
  );
};
