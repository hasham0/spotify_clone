import 'dotenv/config';
import asyncHandler from './async-handler.middleware.js';
import { CustomError } from '../lib/utils/customize-error-messages.js';
import { clerkClient } from '@clerk/express';

const authMiddleware = asyncHandler(async (request, response, next) => {
  try {
    if (!request.auth.userId) {
      throw new CustomError('Unauthorize - you must be logged in', 403);
    }
    request.user = request.auth;
    next();
  } catch (error) {
    next(error);
  }
});

const adminMiddleware = asyncHandler(async (request, response, next) => {
  try {
    const cuurentUser = await clerkClient.users.getUser(request.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === cuurentUser.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      throw new CustomError('Unauthorize - you must be an admin', 403);
    }
    next();
  } catch (error) {
    next(error);
  }
});

export { authMiddleware, adminMiddleware };
