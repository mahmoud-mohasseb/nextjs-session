import connectDB from "../../../connectDB";
import absoluteUrl from "next-absolute-url";
import { sendEmail } from "../../../helpers/sendEmail";
import Room from "../../../model/roomModel";
import User from "../../../model/userModel";
import { v1 as uuid } from "uuid";
import io from "socket.io";

connectDB();
const handler = async (req, res) => {
  const { AdminEmail, invitedEmails, roomId, users } = req.body;
  const { method } = req;
  try {
    switch (method) {
      case "POST" /* Get a model by its ID */:
        try {
          const room = await Room.create({
            // invitedEmails: invitedEmails,
            AdminEmail: AdminEmail,
            users: users,
            roomId: roomId,
          });
          const roominvited = await Room.findOne({ roomId: roomId });
          const { origin } = absoluteUrl(req);
          const Roomlink = `${origin}/src/user/room/${roominvited.roomId}`;
          res.status(200).json({ roominvited: Roomlink });
          // console.log(roominvited.roomId);
          // console.log(roominvited.invitedEmails);
          // const { origin } = absoluteUrl(req);
          // const link = `${origin}/src/user/room/${roominvited.roomId}`;
          // const message = `<div>Joing Meeting ${link}.</div>`;
          // await sendEmail({
          //   to: roominvited.invitedEmails,
          //   subject: "💙🚀 Join Room` ",
          //   text: message,
          // });

          res.status(200).json({ success: true, data: room });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case "GET":
        const user = await Room.findOne({ roomId });
        return res.stats(200).JSON({ ROOM: "mahmoud" });
        // console.log(user);
        // if (user) {
        //   return res.status(200).json({ user: user });
        // }
        break;
    }

    // const { origin } = absoluteUrl(req);
    // const link = `${origin}/src/user/room/${idroom}`;
    // const message = `<div>Joing Meeting ${link}.</div>`;
    // await sendEmail({
    //   to: invited.invitedEmails,
    //   subject: "💙🚀 Join Room` ",
    //   text: message,
    // });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
