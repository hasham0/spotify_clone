import mongoose from "mongoose";
import User from "../../models/user.model.js";

const findOneUserService = async (id) => {
    return await User.findOne({
        clerkId: mongoose.isValidObjectId(id)
            ? mongoose.Types.ObjectId(id)
            : id,
    });
};

const createUserService = async ({ id, firstname, lastname, imageUrl }) => {
    return await User.create({
        clerkId: id,
        fullname: `${firstname} ${lastname}`,
        imageUrl,
    });
};

export { findOneUserService, createUserService };
