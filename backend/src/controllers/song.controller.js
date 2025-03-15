import {
    combineSongsService,
    getAllSongsService,
} from "../lib/services/song.service.js";
import { CustomError } from "../lib/utils/customize-error-messages.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";

const getAllSongs = asyncHandler(async (request, response) => {
    // retrieve all songs and validate
    const songs = await getAllSongsService();
    if (!songs) {
        throw new CustomError("Songs not found", 400);
    }

    return response.status(200).json({ songs });
});

const getFeaturedSongs = asyncHandler(async (request, response) => {
    // retrieve all featured songs and validate
    const songs = await combineSongsService(6);
    if (!songs) {
        throw new CustomError("Songs not found", 400);
    }

    return response.status(200).json({ songs });
});

const getMadeForYouSongs = asyncHandler(async (request, response) => {
    // retrieve all made for you songs and validate
    const songs = await combineSongsService(4);
    if (!songs) {
        throw new CustomError("Songs not found", 400);
    }

    return response.status(200).json({ songs });
});

const getTrendingSongs = asyncHandler(async (request, response) => {
    // retrieve all trending songs and validate
    const songs = await combineSongsService(4);
    if (!songs) {
        throw new CustomError("Songs not found", 400);
    }

    return response.status(200).json({ songs });
});

export { getFeaturedSongs, getMadeForYouSongs, getTrendingSongs, getAllSongs };
