import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const messageSchema = new Schema(
    {
        senderId: {
            type: String, // clerk ID
            required: [true, "Sender ID is required"],
        },
        receiverId: {
            type: String, // clerk ID
            required: [true, "Receiver ID is required"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
    },
    { timestamps: true }
);

const Message = models.Message || model("Message", messageSchema);
export default Message;
