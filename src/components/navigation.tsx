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
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ChevronDown, Linkedin, Mail } from "lucide-react";
import navlogo from "../assets/nav-name.svg";
import resume from "../assets/Vanouphon_Sirisouk_Resume.pdf";

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
        title: "Success",
        description: `Copied ${
          text.includes("@") ? "email address" : "social link"
        } to clipboard!`,
        variant: "subtle",
        status: "success",
        position: "bottom",
        duration: 1000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in copying to clipboard! Please try again!",
        variant: "subtle",
        status: "error",
        position: "bottom",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const pathname = useLocation().pathname;

  return (
    <Box
      h={"fit-content"}
      w={"100%"}
      position={"fixed"}
      top={0}
      bgColor="white"
    >
      <Flex alignItems={"center"} p={2}>
        <RouterLink to={"/"}>
          <Image src={navlogo} alt="vanouphon sirisouk" />
        </RouterLink>
        <Spacer />
        <Breadcrumb spacing={4} separator="" mx={16}>
          {sections.map((section) => {
            return (
              <BreadcrumbItem key={crypto.randomUUID()} isCurrentPage={pathname === `/${section.toLowerCase()}`}>
                <BreadcrumbLink
                  as={RouterLink}
                  color={pathname === `/${section.toLowerCase()}`
                  ? "#6552F5"
                  : "#5F5A86" }
                  fontSize={"md"}
                  textDecoration={"none"}
                  to={section.toLowerCase()}
                >
                  {section}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
        <Link href={resume} isExternal mx={4} fontWeight={"medium"}>
          Resume
        </Link>
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
                  fontWeight={"medium"}
                  icon={obj.icon}
                  onClick={() => copyToClipboard(obj.address)}
                  color="gray.600"
                  key={crypto.randomUUID()}
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
