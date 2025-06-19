import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      minLength: [3, 'title must be at least 3 characters'],
      maxLength: [50, 'title must be at most 50 characters'],
    },
    artist: {
      type: String,
      required: [true, 'Artist name is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image is required'],
    },
    audioUrl: {
      type: String,
      required: [true, 'Audio is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      required: false,
    },
  },
  { timestamps: true },
);

const Song = models.Song || model('Song', songSchema);
export default Song;
