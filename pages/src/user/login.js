import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Center,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SiLinkedin } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { setName, signin } from "../../../store/userSlice";
import { useDispatch } from "react-redux";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = useSession();
  const userName = session?.user?.name;
  // const userImage = session?.user?.image;
  // const userEmail = session?.user?.email;

  useEffect(() => {
    if (session) {
      toast({
        position: "top-right",
        title: "Login Success",
        description: "We'are login in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.replace("/src/user/dashboard");
    }
  }, [router, session]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/user/login`,
        { email, password },
        config
      );

      dispatch(setName(data?.user?.name));
      // dispatch(setName(JSON.stringify(session?.user?.name)));
      toast({
        position: "top-right",
        title: `${data.message}`,
        description: "You login to dashboard.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      cookie.set("token", data?.token);
      cookie.set("user", JSON.stringify(data?.user));
      router.replace("/src/user/dashboard");
    } catch (error) {
      toast({
        position: "top-right",
        title: `${error?.response?.data?.error}`,
        description: "You have to try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" noValidate onSubmit={SubmitHandler}>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
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
            <Heading
              fontSize={"2xl"}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              Sign in to your account
            </Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                rounded={"2xl"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                rounded={"2xl"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox onClick={console.log("mahmoud")}>
                  Remember me
                </Checkbox> */}
                <Link href="forget" color={"blue.500"}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                type="submit"
                bg="blackAlpha.900"
                variant={"solid"}
                color={"white"}
                _hover={{
                  bg: "blackAlpha.600",
                }}
              >
                Sign in
              </Button>
            </Stack>

            <Button
              w={"full"}
              variant={"outline"}
              leftIcon={<FcGoogle />}
              onClick={() => {
                return signIn("google");
                // dispatch(signin("google"));
              }}
            >
              <Center>
                <Text>Sign in with Google</Text>
              </Center>
            </Button>

            {/* LinkedIn */}
            <Button
              w={"full"}
              colorScheme={"messenger"}
              leftIcon={<SiLinkedin />}
              onClick={() => {
                return signIn("linkedin");
                // dispatch(signin("linkedin"));
              }}
            >
              <Center>
                <Text>Send to Linkedin</Text>
              </Center>
            </Button>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            roundedBottomLeft={"full"}
            src={
              "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            }
          />
        </Flex>
      </Stack>
    </Box>
  );
}

export default Login;
