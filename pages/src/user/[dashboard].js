import {
  Button,
  Center,
  Input,
  Stack,
  Flex,
  useToast,
  useClipboard,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DashboardNav from "./components/DashboardNav";
import { signOut, useSession } from "next-auth/react";
import useWindowSize from "../hooks/usewindows";
import Confetti from "react-confetti";
import cookie from "js-cookie";
import axios from "axios";
import { parseCookies } from "nookies";
import { v1 as uuid } from "uuid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selecteduserName, signout } from "../../../store/userSlice";
import { useDispatch } from "react-redux";

function Dashboard() {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const userNameREDUX = useSelector(selecteduserName);
  const { windowSize } = useWindowSize();
  const [confetti, setconfetti] = useState(true);
  // const [posesString, setPosesString] = useState([]);
  const [emailcookies, setemailcookies] = useState("");
  const [Joinroom, setjoinroom] = useState("");
  const [AdminEmail, setAdminEmail] = useState("");
  const [value, setValue] = useState("");
  const { hasCopied, onCopy } = useClipboard(value);
  const cookies = parseCookies();
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const userImage = session?.user?.image;
  const userEmail = session?.user?.email;
  console.log(userImage);
  useEffect(() => {
    if (userNameREDUX !== null) {
      setAdminEmail(emailcookies);
    }
    if (userEmail !== null) {
      setAdminEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    if (!session && !cookies?.user) {
      router.push("/");
    }
  }, [router, session]);

  const Logout = () => {
    signOut();
    // dispatch(signout());
    cookie.remove("user");
    cookie.remove("token");
    // router.push(`/`);
  };

  useEffect(() => {
    const confettier = setTimeout(() => {
      setconfetti(false);
    }, 10000);
    return () => {
      clearTimeout(confettier);
    };
  }, []);

  const CreateRoom = async () => {
    const id = uuid();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/user/dashboard`,
        {
          AdminEmail: AdminEmail,
          // invitedEmails: ["ghareb4@gmail.com", "ghareb4@yahoo.com"],
          roomId: id,
          users: ["ghareb4@gmail.com", "ghareb4@yahoo.com"],
        },
        config
      );
      setjoinroom(data?.roominvited);
      setValue(data?.roominvited);
      setadmin(data?.data?.AdminEmail);
      // setinvited(data?.data?.invitedEmails);
    } catch (err) {
      console.log(err);
    }
    // router.push(`/src/user/room/${id}`);
  };

  const JoinRoom = () => {
    if (!Joinroom) {
      router.push("/src/user/dashboard");
      toast({
        position: "top-right",
        title: `create Room please`,
        description: "You should create Room.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      router.push(Joinroom);
    }
  };

  // useEffect(() => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const { data } = axios.get(`/api/user/dashboard`, {}, config);
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // ---------------------
  // router.push(`/src/user/room/${id}`);
  // const Handletargetinput = (e) => {
  //   const Email = e.target.value;
  //   var validRegex =
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   if (Email.match(validRegex)) {
  //     setinvitedEmail(Email);
  //   } else {
  //     return;
  //   }
  // };

  // const Invite = (e) => {
  //   e.preventDefault();
  //   setInvitedtosession([invitedEmail, ...Invitedtosession]);
  // };

  return (
    <>
      <DashboardNav
        onClick={Logout}
        userName={userName || userNameREDUX}
        userImage={userImage}
        src={userImage}
      />

      <Flex mb={2}>
        <Input value={Joinroom} isReadOnly placeholder="Welcome" />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>

      <Button onClick={CreateRoom}>Create Room</Button>
      <Button onClick={JoinRoom}>JoinRoom</Button>
      {confetti ? <Confetti width={windowSize} /> : null}

      <Center>
        <Stack>
          {/* <Box>
            <Input type="email" placeholder="Email" />
          </Box> */}
        </Stack>
      </Center>
      <h1 style={{ color: "red" }}>name:{userNameREDUX || userName}</h1>
    </>
  );
}

export default Dashboard;

// export async function getServerSideProps({}) {
//   await connectDB();
//   const room = await Room.find().lean();
//   return { props: { room } };
// }

{
  /* <Confetti /> */
}
{
  /* <CodeEditor /> */
}
{
  /* <Paint /> */
}
{
  /* <BottomSide /> */
}
{
  /* <PoseNet
        width={400}
        height={400}
        inferenceConfig={{ decodingMethod: "single-person" }}
        onEstimate={(poses) => {
          console.log(poses); //nose
          // setPosesString(JSON.stringify(poses));
        }}
      /> */
}
