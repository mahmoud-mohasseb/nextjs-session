import * as React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [handsstart, sethandstart] = useState();
  //
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  const cookies = parseCookies;

  useEffect(() => {
    if (session) {
      // toast.success("Login Success");
      toast({
        position: "top-right",
        title: "Login Success",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/src/user/login");
    }
    if (cookies?.user) {
      router.push("/src/user/login");
    }
  }, [router]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== conPassword) {
        toast({
          position: "top-right",
          title: "passwords do not match",
          description: "Do match both passwords.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        // toast.error("passwords do not match!");
        return;
      }
      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : "";

      // console.log(email, password, firstName, lastName);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/user/register`,
        { email, password, firstName, lastName },
        config
      );
      // toast.success(data?.message);
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
      // toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            as={"form"}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            onSubmit={SubmitHandler}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* confirm password */}
              <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setshowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg="blackAlpha.900"
                  color={"white"}
                  _hover={{
                    bg: "blackAlpha.600",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="/src/user/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Register;
