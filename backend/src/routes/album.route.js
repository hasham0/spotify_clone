import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controllers/album.controller.js";

const router = Router();

router.route("/").get(getAllAlbums);
router.route("/:_id").get(getAlbumById);

export default router;
