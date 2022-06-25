import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Box,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const SignIn = () => {
  const router = useRouter();
  const { token } = router.query;
  const toast = useToast();
  console.log(token);
  const [password, setpassword] = useState("");
  const [conPassword, setconPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    try {
      //   const password = result.get("password");
      //   const conPassword = result.get("conPassword");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/user/reset/${token}`,
        { conPassword, password },
        config
      );
      toast({
        position: "top-right",
        title: `${data.message}`,
        description: "please try again.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/src/user/login");
    } catch (error) {
      toast({
        position: "top-right",
        title: `${error?.response?.data?.error}`,
        description: "please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        as={"form"}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        onSubmit={handleSubmit}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Enter new password
          </Heading>
          <FormControl id="password" isRequired>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              name="Password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="conPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="conPassword"
              id="conPassword"
              value={conPassword}
              onChange={(e) => setconPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignIn;
