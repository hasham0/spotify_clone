import mongoose from 'mongoose';
import Song from '../../models/song.model.js';

const getAllSongsService = async () => {
  return await Song.find().sort({ createdAt: -1 });
};

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
    albumId: albumId || '',
  });
};

const findSongService = async (id) => {
  return await Song.findById({ _id: id });
};

const deleteSongService = async (id) => {
  return await Song.findByIdAndDelete({
    _id: id,
  });
};

// TODO: featured ,for your and trending combine song service
const combineSongsService = async (songSize) => {
  return await Song.aggregate([
    {
      $sample: { size: songSize },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        artist: 1,
        imageUrl: 1,
        audioUrl: 1,
      },
    },
  ]);
};

export {
  getAllSongsService,
  createSongService,
  findSongService,
  deleteSongService,
  combineSongsService,
};
