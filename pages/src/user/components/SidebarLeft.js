import React, { useEffect } from "react";
import { Box, Slide, VStack, Flex, useDisclosure } from "@chakra-ui/react";
import { AddIcon, QuestionOutlineIcon, SearchIcon } from "@chakra-ui/icons";
const SidebarLeft = () => {
  return (
    <Flex
      direction="column"
      alignItems="start"
      pl={4}
      justifyContent="space-between"
      bg="black"
      w={14}
      position="fixed"
      borderRightRadius="2xl"
      top="0"
      bottom="0"
      _hover={{
        // w: 40,
        boxShadow: "dark-lg",
      }}
      transitionProperty="all"
      transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
      transitionDuration="150ms"
      flexShrink={0}
    >
      <VStack pb={12} pt={5} alignItems="center" spacing={5}>
        <Box bg="gray.100" h={6} w={6} borderRadius="full"></Box>
        <AddIcon
          //   onClick={handleOpenCreateIssueModal}
          h={5}
          w={5}
          color="gray.100"
        />
        <SearchIcon h={5} w={5} color="gray.100" />
      </VStack>
      <Flex py={5} direction="column" alignItems="center">
        <QuestionOutlineIcon h={5} w={5} color="gray.100" />
      </Flex>
    </Flex>
  );
};

export default SidebarLeft;
