import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "32kb"}))
app.use(express.urlencoded({extended: true, limit: "32kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// importing routes
import userRoutes from "./routes/user.Routes.js"
import videoRoutes from "./routes/video.Routes.js"
import commentRoutes from "./routes/comment.Routes.js"
import createPlaylist from "./routes/playlist.Routes.js"
import toggleVideoLike from "./routes/like.Routes.js"

// Routes Declaration

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/videos", videoRoutes)
app.use("/api/v1/comments", commentRoutes)
app.use("/api/v1/playlist", createPlaylist)
app.use("/api/v1/like", toggleVideoLike)

export default app;
