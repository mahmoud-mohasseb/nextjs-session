import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Box,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import { useRouter } from "next/router";
import { useState } from "react";

export default function Forgot() {
  const toast = useToast();
  const router = useRouter();
  //   const [email, setemail] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    try {
      const email = result.get("email");

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`/api/user/forget`, { email }, config);
      console.log(data);
      // toast.success(data.message);

      toast({
        title: `${data?.message}`,
        description: "Reset Email has been sent check out your email.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/src/user/login");
    } catch (error) {
      toast({
        title: `${error?.response?.data?.error}`,
        description:
          "check out your email and make sure you wrote correct one.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      // toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box as={"form"} onSubmit={handleSubmit}>
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
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            You&apos;ll get an email with a reset link
          </Text>

          <FormControl id="email" isRequired>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              required
              fullWidth
              id="email"
              name="email"
              // autoComplete="email"
              // autoFocus
              //   value={email}
              //   onChange={(e) => setemail(e.target.value)}
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
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
