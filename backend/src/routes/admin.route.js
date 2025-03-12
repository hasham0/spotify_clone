import { Router } from "express";
import {
    adminMiddleware,
    authMiddleware,
} from "../middlewares/auth.middleware.js";
import {
    checkAdmin,
    createAlbum,
    createSong,
    deleteAlbum,
    deleteSong,
} from "../controllers/admin.controller.js";
import { body, param } from "express-validator";
const router = Router();

router.use([authMiddleware, adminMiddleware]);

router.route("/checkAdmin").get(checkAdmin);

// TODO: routes for album
router.route("/createAlbum").post(
    [
        body("title")
            .isLength({ min: 3 })
            .withMessage("title is required and must be in string"),
        body("artist")
            .isString()
            .withMessage("artist name is required and must be in string"),
        body("releaseYear")
            .isNumeric()
            .withMessage("release year is required and must be in number"),
        body("duration")
            .isNumeric()
            .withMessage("duration is required and must be in number"),
        body("imageFile").custom((_, { req }) => {
            if (!req.files || !req.files.imageFile) {
                throw new Error("All file is required");
            }
            // const file = req.files.songFile;

            // // Validate file type
            // if (!file.mimetype.startsWith("audio/")) {
            //     throw new Error("Only audio files are allowed");
            // }

            // Validate file size (e.g., max 5MB)
            if (file.size > 10 * 1024 * 1024) {
                throw new Error("File size must be less than 10MB");
            }

            return true;
        }),
    ],
    createAlbum
);

router
    .route("/deleteAlbum/:id")
    .delete(
        [param("id").isString().withMessage("album id is required")],
        deleteAlbum
    );

// TODO: routes for song
router.route("/createSong").post(
    [
        body("title")
            .isLength({ min: 3 })
            .withMessage("title must be required and in strings"),
        body("artist")
            .isString()
            .withMessage("artist name must be required and in strings"),
        body("albumId")
            .isString()
            .withMessage("albumId must be required and in strings"),
        body("duration")
            .isNumeric()
            .withMessage("duration must be required and in number"),
        body("audioFile", "imageFile").custom((_, { req }) => {
            if (!req.files || !req.files.audioFile || !req.files.imageFile) {
                throw new Error("All file is required");
            }
            // const file = req.files.songFile;

            // // Validate file type
            // if (!file.mimetype.startsWith("audio/")) {
            //     throw new Error("Only audio files are allowed");
            // }

            // Validate file size (e.g., max 5MB)
            if (file.size > 10 * 1024 * 1024) {
                throw new Error("File size must be less than 10MB");
            }

            return true;
        }),
    ],
    createSong
);

router
    .route("/deleteSong/:id")
    .delete(
        [
            authMiddleware,
            adminMiddleware,
            param("id").isString().withMessage("album id is required"),
        ],
        deleteSong
    );

export default router;
