import Album from "../../models/album.model.js";

const findAndUpdateAlbumService = async (type, albumId, songId) => {
    switch (type) {
        case "push":
            await Album.findByIdAndUpdate(
                { _id: albumId },
                {
                    $push: {
                        song: songId,
                    },
                },
                { new: true }
            );
            break;
        case "pull":
            await Album.findByIdAndUpdate(
                { _id: albumId },
                {
                    $pull: {
                        song: songId,
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
    return await Album.deleteMany({ albumId });
};

export { findAndUpdateAlbumService, createAlbumService, deleteAlbumService };
