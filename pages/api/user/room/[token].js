import connectDB from "../../../../connectDB";
import Room from "../../../../model/roomModel";
import User from "../../../../model/userModel";
import ActiveRoom from "../../../../model/activeRoomModel";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../../helpers/sendEmail";
import { Server } from "socket.io";
import absoluteUrl from "next-absolute-url";

// params id
connectDB();
const handler = async (req, res) => {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  const { token, userid } = req.body;

  console.log(token);
  const { method } = req;

  const users = {};
  const socketToRoom = {};
  // if (res.socket.server.io) {
  //   console.log("Socket is already running");
  // } else {
  //   console.log("Socket is initializing");

  // const io = new Server();
  // tooken is refering to roomid

  // }
  // res.end();
  try {
    // if (req.method === "POST") {
    // const users = [];
    // const roomID = await Room.findOne({ token });
    // const userid = await User.findOne({ email });
    // const room = await ActiveRoom.create({
    //   users: users,
    //   roomId: token,
    // });
    // console.log(roomID);
    // console.log(userid);

    io.on("connection", (socket) => {
      socket.on("join room", (roomID) => {
        if (users[roomID]) {
          const length = users[roomID].length;
          if (length === 4) {
            socket.emit("room full");
            return;
          }
          users[roomID].push(socket.id);
        } else {
          users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
      });

      socket.on("sending signal", (payload) => {
        io.to(payload.userToSignal).emit("user joined", {
          signal: payload.signal,
          callerID: payload.callerID,
        });
      });

      socket.on("returning signal", (payload) => {
        io.to(payload.callerID).emit("receiving returned signal", {
          signal: payload.signal,
          id: socket.id,
        });
      });

      socket.on("disconnect", () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
          room = room.filter((id) => id !== socket.id);
          users[roomID] = room;
        }
      });
    });

    //
    // }
    // find user
    // find roomid
    // maping
  } catch (err) {
    console.log(err);
  }
};

export default handler;
