// import and set dotenv config
import dotenv from "dotenv";
dotenv.config();

// import modules
import cors from "cors";
import path from "path";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";

// import api routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import albumRoutes from "./routes/album.route.js";
import songRoutes from "./routes/song.route.js";
import statisticsRoutes from "./routes/statistics.route.js";

// import global level error handle middlewares
import errorMiddleware from "./middlewares/error.middleware.js";

// set variable
const app = express();
const __dirname = path.resolve();

// set middlewares
app.use(clerkMiddleware());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "temp"),
        createParentPath: true,
        limits: {
            fieldSize: 10 * 1024 * 1024,
        },
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CROSS_ORIGIN,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// set routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/statistics", statisticsRoutes);

// set global level error handling middlwere
app.use(errorMiddleware);

export default app;
