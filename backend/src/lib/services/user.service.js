import mongoose from "mongoose";
import User from "../../models/user.model.js";

const getAllUserService = async (userId) => {
    return await User.find({ clerkId: { $ne: userId } });
};

const getMessagesService = async (userId, myId) => {
    return await User.find({
        $or: [
            {
                senderId: userId,
                receiverId: myId,
            },
            {
                senderId: myId,
                receiverId: userId,
            },
        ],
    }).sort({ createdAt: -1 });
};

const findOneUserService = async (id) => {
    return await User.findOne({
        clerkId: mongoose.isValidObjectId(id)
            ? mongoose.Types.ObjectId(id)
            : id,
    });
};

const createUserService = async ({ id, firstname, lastname, imageUrl }) => {
    return await User.create({
        clerkId: mongoose.isValidObjectId(id)
            ? mongoose.Types.ObjectId(id)
            : id,
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
