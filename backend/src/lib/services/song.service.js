import mongoose from "mongoose";
import Song from "../../models/song.model.js";

const createSongService = async ({
    title,
    artist,
    imageFile,
    audioFile,
    duration,
    albumId,
}) => {
    return await Song.create({
        title,
        artist,
        imageUrl: imageFile,
        audioUrl: audioFile,
        duration,
        albumId: albumId || "",
    });
};

const findSongService = async (id) => {
    return await Song.findById({ _id: mongoose.Types.ObjectId(id) });
};

const deleteSongService = async (id) => {
    return await Song.findByIdAndDelete({
        _id: mongoose.Types.ObjectId(id),
    });
};
export { createSongService, findSongService, deleteSongService };
