import { getAllUserService } from "../lib/services/user.service.js";
import { CustomError } from "../lib/utils/customize-error-messages.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const getAllUsers = asyncHandler(async (request, response) => {
    //  extract current user id
    const currentUserId = request.user.userId;

    // get all users except current user and validate
    const users = await getAllUserService(currentUserId);
    if (!users) {
        throw new CustomError("users not found", 400);
    }

    return response.status(200).json({ users });
});

const getMessages = asyncHandler(async (request, response) => {
    const myId = request.user.userId;
    const { _id } = request.params;

    const messages = await getMessagesService(_id, myId);
    return response.status(200).json({ messages });
});

export { getAllUsers, getMessages };
