import { getAllUserService } from "../lib/services/user.service.js";
import { CustomError } from "../lib/utils/customize-error-messages.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const getAllUsers = asyncHandler(async (request, response) => {
    //  extract current user id
    const currentUserId = request.user.Id;

    // get all users except current user and validate
    const users = await getAllUserService(currentUserId);
    if (!users) {
        throw new CustomError("users not found", 400);
    }

    return response.status(200).json({ users });
});

export { getAllUsers };
