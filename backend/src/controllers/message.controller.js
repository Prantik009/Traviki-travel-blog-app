import cloudinary from "../lib/cloudinary.config.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    //get the current user
    const loggedInUserId = req.user._id;
    //filter all users except current user
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const myId = req.user._id;

    const messages_between_sender_receiver = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });

    res.status(200).json({ messages_between_sender_receiver });
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const myId = req.user._id;

    let imageUrl;
    //if image in the message upload it to coludinary and get the base64 url and store it to imageUrl
    if (image) {
      //get the imageurl
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    //create the new message
    const newMessage = new Message({
      senderId: myId,
      receiverId: receiverId,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();
    //TODO: real-time functionality here -> socket.io [done]
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
