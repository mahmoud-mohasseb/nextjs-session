import Webcam from "react-webcam";
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Slide,
  VStack,
  Flex,
  useDisclosure,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { AddIcon, QuestionOutlineIcon, SearchIcon } from "@chakra-ui/icons";

const Webcams = () => {
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

  return (
    <Flex
      direction="row"
      pl={4}
      justifyContent="space-between"
      position="fixed"
      top="20"
      left={20}
    >
      <Webcam />
      {/* <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem w="100%" h="10">
          <Webcam />
        </GridItem>
        <GridItem w="100%" h="10">
          <Webcam />
        </GridItem>
        <GridItem w="100%" h="10">
          <Webcam />
        </GridItem>
        <GridItem w="100%" h="10">
          <Webcam />
        </GridItem>
        <GridItem w="100%" h="10">
          <Webcam />
        </GridItem>
      </Grid> */}
    </Flex>
  );
};

export default Webcams;
