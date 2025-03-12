import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: [true, "Fullname is required"],
            minLength: [3, "Fullname must be at least 3 characters"],
            maxLength: [50, "Fullname must be at most 50 characters"],
        },
        imageUrl: {
            type: String,
            required: [true, "Image is required"],
        },
        clerkId: {
            type: String,
            required: [true, "Clerk ID is required"],
            unique: true,
        },
    },
    { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
