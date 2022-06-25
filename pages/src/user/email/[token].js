import { useRouter } from "next/router";
import axios from "axios";

import {
  Text,
  Stack,
  Box,
  Center,
  useBreakpointValue,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import react, { useEffect } from "react";

const EmailConfirm = () => {
  const router = useRouter();
  const toast = useToast();
  // to redirect to confirmation page
  const { token } = router.query;

  useEffect(() => {
    sendToken(token);
  }, [token]);

  const sendToken = async (token) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(`/api/user/email/${token}`, {}, config);
      toast({
        position: "top-right",
        title: `${data.message}`,
        description: "please try again.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      // toast.error(error?.response?.data?.error);
      toast({
        position: "top-right",
        title: `${error?.response?.data?.error}`,
        description: "try new password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Center>
        <Box
          as="form"
          noValidate
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Text
            textAlign={useBreakpointValue({ base: "center" })}
            fontFamily={"heading"}
            fontSize={"large"}
            color={useColorModeValue("gray.800", "white")}
          >
            welcome to sessions
          </Text>
          <Stack spacing={3}>
            <Text fontSize="6xl">Email Confirmed</Text>
            {/* <Button
              onClick={sendToken}
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Confirm
            </Button> */}
          </Stack>
        </Box>
      </Center>
    </>
  );
};

export default EmailConfirm;
