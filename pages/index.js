import { useEffect, useState } from "react";
// import styles from "../styles/Home.module.css";
import WithSubnavigation from "./src/user/components/Navbar";
import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
export default function Home() {
  // const [profiledata, setprofiledata] = useState([]);

  // useEffect(() => {
  //   const profile = async () => {
  //     const response = await fetch("/api/hello");
  //     const data = await response.json();
  //     console.log(data?.profile);
  //     setprofiledata([data?.profile]);
  //   };
  //   profile();
  // }, []);

  return (
    <div>
      <WithSubnavigation />
      <div>
        <>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="9xl"
              fontFamily={"heading"}
              fontWeight={"extrabold"}
            >
              Sessions
            </Text>
          </Flex>

          {/* <h1>firstname {item.firstname}</h1>
              <h1>lastname {item.lastname}</h1>
              <h1>age {item.age}</h1> */}
        </>
      </div>
    </div>
  );
}
