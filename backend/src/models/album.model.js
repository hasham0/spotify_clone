import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const albumSchema = new Schema(
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
    releaseYear: {
      type: Number,
      required: [true, 'Release year is required'],
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
      },
    ],
  },
  { timestamps: true },
);

const Album = models.Album || model('Album', albumSchema);
export default Album;
