import { CustomError } from "../customize-error-messages.js";
import cloudinary from "./cloudinary.js";

const uploadeToCloudinary = async (file) => {
    try {
        const fileUrl = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "Spotify_Clone",
            resource_type: "auto",
        });
        return fileUrl.secure_url;
    } catch (error) {
        throw new CustomError("Error while uploading in cloudinary", 400);
    }
};

export default uploadeToCloudinary;
