import {
    createUserService,
    findOneUserService,
} from "../lib/services/user.service.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const checkAuth = asyncHandler(async (request, response) => {
    const { id, firstname, lastname, imageUrl } = request.body;

    // check if user already existed
    const user = await findOneUserService(id);

    if (user) {
        throw new CustomError("User already exist", 201);
    }
    await createUserService({ id, firstname, lastname, imageUrl });
    return response.json({
        success: true,
    });
});

export { checkAuth };
