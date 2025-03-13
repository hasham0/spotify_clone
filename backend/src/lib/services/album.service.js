import mongoose from "mongoose";
import Album from "../../models/album.model.js";

const getAlbumsService = async () => {
    return await Album.find();
};

const getAlbumByIdService = async (id) => {
    return await Album.findById({
        _id: mongoose.Types.ObjectId(id),
    }).populate("songs");
};

const findAndUpdateAlbumService = async (type, albumId, songId) => {
    switch (type) {
        case "push":
            await Album.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(albumId) },
                {
                    $push: {
                        song: mongoose.Types.ObjectId(songId),
                    },
                },
                { new: true }
            );
            break;
        case "pull":
            await Album.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(albumId) },
                {
                    $pull: {
                        song: mongoose.Types.ObjectId(songId),
                    },
                },
                { new: true }
            );
            break;

        default:
            break;
    }
};
const createAlbumService = async ({ title, artist, imageUrl, releaseYear }) => {
    return await Album.create({ title, artist, imageUrl, releaseYear });
};

const deleteAlbumService = async (albumId) => {
    return await Album.deleteMany({ _id: mongoose.Types.ObjectId(albumId) });
};

export {
    getAlbumsService,
    getAlbumByIdService,
    findAndUpdateAlbumService,
    createAlbumService,
    deleteAlbumService,
};
