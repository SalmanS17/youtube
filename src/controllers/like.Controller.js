import {Like} from "../models/like.model.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Ensure `likes` is always a number (default to 0 if null)
        if (video.likes === null || video.likes === undefined) {
            video.likes = 0;
        }

        let message = ""; // Message for response

        // Toggle like count
        if (video.likes > 0) {
            video.likes -= 1;
            message = "Like removed";
        } else {
            video.likes += 1;
            message = "Video liked";
        }

        await video.save();

        res.status(200).json({
            message,
            likes: video.likes
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Toggling like on video...

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!commentId) {
        throw new ApiError(400, "Invalid comment ID");
    }

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Initialize likes count if not set
        if (typeof comment.likes !== "number") {
            comment.likes = 0; // Initialize likes to 0 if undefined
        }

        let message = ""; // Initialize message variable

        // Toggle like count: If it's 0, like it (set to 1); if it's 1, remove like (set to 0)
        if (comment.likes === 1) {
            comment.likes = 0;
            message = "Like removed";
        } else {
            comment.likes = 1;
            message = "Comment liked";
        }

        await comment.save();

        res.status(200).json({
            message, // Send the message as part of the response
            likes: comment.likes // Return the updated like count
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export {

         toggleVideoLike, 
         toggleCommentLike,
}