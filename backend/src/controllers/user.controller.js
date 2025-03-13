import { getAllUserService } from "../lib/services/user.service.js";
import { CustomError } from "../lib/utils/customize-error-messages.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const getAllUsers = asyncHandler(async (request, response) => {
    const currentUserId = request.user.Id;
    const users = await getAllUserService(currentUserId);
    if (!users) {
        throw new CustomError("users not found", 400);
    }
    return response.status(200).json({ users });
});

export { getAllUsers };
