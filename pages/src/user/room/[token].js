import { Button, Box, useColorModeValue } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { DownloadIcon } from "@chakra-ui/icons";
import PoseNet from "react-posenet";
import useWindowSize from "../../hooks/usewindows";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import axios from "axios";
import BottomSide from "../components/BottomSide";
import DashboardNav from "../components/DashboardNav";
import Webcams from "../components/Webcams";
import { useToast } from "@chakra-ui/react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Paint from "../paint";
import CodeEditor from "../codeEditor";
import Editor from "@monaco-editor/react";
import Confetti from "react-confetti";
import io from "socket.io-client";
import Peer from "simple-peer";
import { selecteduserName } from "../../../../store/userSlice";
import { useSelector } from "react-redux";
import Video from "./Video";

export default function Room() {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const [users, setusers] = useState([]);
  const [peers, setPeers] = useState([]);

  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { token: roomID } = router.query;

  // const socket = io.connect(`/api/user/room/${token}`);
  // console.log(socket);
  const userName = session?.user?.name;
  const userNameREDUX = useSelector(selecteduserName);

  useEffect(() => {
    if (userNameREDUX !== null || userName !== null) {
      setusers(userNameREDUX || userName);
    }
  }, []);

  useEffect(() => {
    // socketRef.current = io.connect(`/api/user/room/${roomID}`);
    socketRef.current = io.connect(`/`);
    navigator.mediaDevices
      .getUserMedia({
        video: { height: window.innerHeight / 2, width: window.innerWidth / 2 },
        audio: true,
      })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  // useEffect(() => {
  //   async () => {
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const { data } = await axios.post(
  //         `/api/user/room`,
  //         {
  //           roomid: token,
  //           users: users,
  //           // Find roomid .
  //           // Find user .
  //         },
  //         config
  //       );
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (!cookie && !session?.user) {
      toast({
        position: "top-right",
        title: "please login",
        description: "We'are login in.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      router.replace("/src/user/login");
    }
  }, [router, cookie, session]);

  return (
    <>
      {/* <DashboardNav /> */}
      <SidebarLeft />
      <video muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
      {/* <Webcams /> */}
      <SidebarRight />
    </>
  );
}
{
  /* <Invite /> */
}
{
  /* <Webcams /> */
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
          console.log(poses); //nose1
          // setPosesString(JSON.stringify(poses));
        }}
      /> */
}
