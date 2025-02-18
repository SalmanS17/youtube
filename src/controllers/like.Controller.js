import {Like} from "../models/like.model.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import { Video } from "../models/video.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    // const userId = req.user.id; 

    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Check if user has already liked the video
        const hasLiked = video.likes.includes(userId);

        if (hasLiked) {
            // Unlike the video
            video.likes = video.likes.filter(id => id.toString() !== userId);
        } else {
            // Like the video
            video.likes.push(userId);
        }

        await video.save();

        res.status(200).json({
            message: hasLiked ? "Like removed" : "Video liked",
            likes: video.likes.length
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export {

    toggleVideoLike, 
}