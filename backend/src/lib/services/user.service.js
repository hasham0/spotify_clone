import mongoose from "mongoose";
import User from "../../models/user.model.js";
import Message from "../../models/message.model.js";

const getAllUserService = async (userId) => {
    return await User.find({ clerkId: { $ne: userId } });
};

const getMessagesService = async (userId, myId) => {
    return await Message.find({
        $or: [
            { senderId: myId, receiverId: userId },
            { senderId: userId, receiverId: myId },
        ],
    }).sort({ createdAt: -1 });
};

const findOneUserService = async (id) => {
    return await User.findOne({
        clerkId: mongoose.isValidObjectId(id) ? id : id,
    });
};

const createUserService = async ({ id, firstname, lastname, imageUrl }) => {
    return await User.create({
        clerkId: mongoose.isValidObjectId(id) ? id : id,
        fullname: `${firstname} ${lastname}`,
        imageUrl,
    });
};

export {
    getAllUserService,
    getMessagesService,
    findOneUserService,
    createUserService,
};
