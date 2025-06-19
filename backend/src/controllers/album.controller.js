import {
  getAlbumByIdService,
  getAlbumsService,
} from '../lib/services/album.service.js';
import { CustomError } from '../lib/utils/customize-error-messages.js';
import asyncHandler from '../middlewares/async-handler.middleware.js';

const getAllAlbums = asyncHandler(async (request, response) => {
  // retrieve all albums and validate
  const albums = await getAlbumsService();
  if (!albums) {
    throw new CustomError('Albums not found', 400);
  }

  return response.status(200).json({ albums });
});

const getAlbumById = asyncHandler(async (request, response) => {
  // extract album id
  const { _id } = request.params;

  // retrieve album and validate
  const album = await getAlbumByIdService(_id);
  if (!album) {
    throw new CustomError('Album songs not found', 400);
  }

  return response.status(200).json({ album });
});

export { getAllAlbums, getAlbumById };
