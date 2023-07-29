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
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  useMediaQuery,
  useDisclosure,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ChevronDown, Linkedin, Mail, Menu as LucideMenu } from "lucide-react";
import navlogo from "../assets/nav-name.svg";
import resume from "../assets/Vanouphon_Sirisouk_Resume.pdf";

export const NavigationMenu = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
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

  const pathname = useLocation().pathname;

  const mobileNav = () => {
    return (
      <>
        <IconButton
          icon={<Icon as={LucideMenu} />}
          onClick={onOpen}
          aria-label="menu"
          variant="ghost"
        />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>
            <Divider color={"gray.200"} />
            <DrawerBody>
              <VStack mt={4} spacing={4} align="stretch">
                <Link
                  as={RouterLink}
                  color={pathname === `/` ? "#6552F5" : "#5F5A86"}
                  fontSize={"md"}
                  textDecoration={"none"}
                  to={"/"}
                  key={crypto.randomUUID()}
                >
                  Home
                </Link>
                {sections.map((section) => {
                  return (
                    <Link
                      as={RouterLink}
                      color={
                        pathname === `/${section.toLowerCase()}`
                          ? "#6552F5"
                          : "#5F5A86"
                      }
                      fontSize={"md"}
                      textDecoration={"none"}
                      to={section.toLowerCase()}
                      key={crypto.randomUUID()}
                    >
                      {section}
                    </Link>
                  );
                })}

                <Menu isLazy>
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
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };

  const desktopNav = () => {
    return (
      <>
        <RouterLink to={"/"}>
          <Image src={navlogo} alt="vanouphon sirisouk" />
        </RouterLink>
        <Spacer />
        <Breadcrumb spacing={4} separator="" mx={16}>
          {sections.map((section) => {
            return (
              <BreadcrumbItem
                key={crypto.randomUUID()}
                isCurrentPage={pathname === `/${section.toLowerCase()}`}
              >
                <BreadcrumbLink
                  as={RouterLink}
                  color={
                    pathname === `/${section.toLowerCase()}`
                      ? "#6552F5"
                      : "#5F5A86"
                  }
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
        <Menu isLazy>
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
      </>
    );
  };

  return (
    <Box
      h={"fit-content"}
      w={"100%"}
      position={"fixed"}
      top={0}
      bgColor="white"
    >
      {isLargerThan800 ? (
        <Flex alignItems={"center"} p={2}>
          {desktopNav()}
        </Flex>
      ) : (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Button
            as={undefined}
            bg={"transparent"}
            disabled
            _hover={{}}
            _active={{}}
          />
          <Image src={navlogo} alt="vanouphon sirisouk" />
          {mobileNav()}
        </Flex>
      )}
      <Divider />
    </Box>
  );
};
