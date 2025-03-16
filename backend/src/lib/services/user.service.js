import mongoose from "mongoose";
import User from "../../models/user.model.js";

const getAllUserService = async (userId) => {
    // return await User.find({ clerkId: userId });
    return await User.find();
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

export { getAllUserService, findOneUserService, createUserService };
