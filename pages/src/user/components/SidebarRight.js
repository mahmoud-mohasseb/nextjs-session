import React, { useEffect, useState } from "react";
import {
  Box,
  Slide,
  VStack,
  Flex,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { AddIcon, QuestionOutlineIcon, SearchIcon } from "@chakra-ui/icons";

const SidebarRight = () => {
  // const { open, setopen } = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("right");

  return (
    <Flex
      direction="column"
      alignItems="start"
      pl={4}
      justifyContent="space-between"
      bg="black"
      w={14}
      borderLeftRadius="2xl"
      position="fixed"
      top="0"
      bottom="0"
      right={0}
      //   _hover={{
      //     w: open ? 0 : 80,
      //     boxShadow: "dark-lg",
      //   }}
      transitionProperty="all"
      transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
      transitionDuration="150ms"
      flexShrink={0}
    >
      <VStack pb={12} pt={5} alignItems="center" spacing={5}>
        <Box bg="gray.100" h={6} w={6} borderRadius="full"></Box>
        <AddIcon h={5} w={5} color="gray.100" onClick={onOpen} />
        <SearchIcon h={5} w={5} color="gray.100" />
      </VStack>
      <Flex py={5} direction="column" alignItems="center">
        <QuestionOutlineIcon h={5} w={5} color="gray.100" />
      </Flex>
      {/* drawer */}
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default SidebarRight;
