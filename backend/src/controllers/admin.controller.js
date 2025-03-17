import { ValidationError } from "../lib/utils/customize-error-messages.js";
import asyncHandler from "../middlewares/async-handler.middleware.js";
import { validationResult } from "express-validator";
import uploadeToCloudinary from "../lib/utils/cloudinary/uploadToCloudinary.js";
import {
    createSongService,
    deleteSongService,
    findSongService,
} from "../lib/services/song.service.js";
import {
    createAlbumService,
    deleteAlbumService,
    findAndUpdateAlbumService,
} from "../lib/services/album.service.js";

const checkAdmin = asyncHandler(async (request, response) => {
    return response.status(200).json({ isAdmin: true });
});

// TODO: controllers for album

const createAlbum = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    // extract data from body
    const { title, artist, releaseYear } = request.body;
    const { imageFile } = request.files;

    // upload image file to cloudinary
    const imageUrl = await uploadeToCloudinary(imageFile);

    // create new album
    const album = await createAlbumService({
        title,
        artist,
        imageUrl,
        releaseYear,
    });

    return response.status(201).json({
        album,
    });
});

const deleteAlbum = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract album id
    const { _id } = request.params;

    // delete album
    await deleteAlbumService(_id);

    return response.status(200).json({
        message: "Album delete successfully",
    });
});

// TODO: controllers for song

const createSong = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract data from body
    const { title, artist, albumId, duration } = request.body;

    // extract audo and image file
    const { audioFile, imageFile } = request.files;

    // upload image and audio file to cloudinary
    const audioUrl = await uploadeToCloudinary(audioFile);
    const imageUrl = await uploadeToCloudinary(imageFile);

    // create new song
    const song = await createSongService({
        title,
        artist,
        imageUrl,
        audioUrl,
        duration,
        albumId,
    });

    // update song using ablum id
    await findAndUpdateAlbumService("push", albumId, song._id);

    return response.status(200).json({
        song,
    });
});

const deleteSong = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract song id from params
    const { _id } = request.params;

    // fetch song details and if song belongs to album update song array
    const song = await findSongService(_id);
    if (!(song && song.albumId)) {
        throw new CustomError("album not found", 401);
    }
    await findAndUpdateAlbumService("pull", song.albumId, song._id);

    // delete song
    await deleteSongService(_id);

    return response.status(200).json({ message: "Song deleted successfully" });
});
export { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum };
