import { isValidObjectId } from "mongoose";
import {Comment} from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req, res) =>{
    const {content, videoId} = req.body;

    // console.log("Req body", req.body)

    if(!content || !videoId) {
        throw new apiError(400, "content and Video Id are required!")
    }
    if(!isValidObjectId(videoId)){
        throw new apiError(400, "Invalid Video Id");
    }

    const video = await Video.findById(videoId)
    if(!video){
        throw new apiError(404, "video not found")
    }

    const comment = await Comment.create({
        content,
        videoId,
        // userId: req.user.id
    });

    res.status(201).json({success: true, comment})

});

// Getting Comments..


               // NOt Complete todo.....

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    // console.log("Received req.params:", req.params);
    // console.log("Received videoId:", videoId)

    if (!isValidObjectId(videoId)) {
        // console.log("Invalid req.params detected:",req.params);
        // console.log("Invalid videoId detected:", videoId);
        throw new apiError(400, "Invalid video Id!");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new apiError(404, "Video not found!");
    }

    const comments = await Comment.find({ video: videoId })

    res.status(200).json({ success: true, comments });
    console.log("Fetched comments:", comments.content);
});

// Getting  a single comment

const singleComment = asyncHandler(async (req, res) =>{
    const {commentId} = req.params;
    if(!isValidObjectId(commentId)) {
        throw new apiError(400, "Invalid Comment id")
    }
    
    const comment = await Comment.findById(commentId)
    if(!comment) {
        throw new apiError(400, "Comment not found!")
    }

    res.status(200).json({success: true, data: comment})
    console.log(`content of the comment is: ${comment.content}`)
})

// Updating comments....

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;  

   
    if (!isValidObjectId(commentId)) {
        // console.log("Invalid commentId detected:", commentId);
        throw new apiError(400, "Invalid commentId!");
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId, 
        req.body, 
        { new: true }  
    );

    // If no comment was found, throw a 404 error
    if (!updatedComment) {
        throw new apiError(404, "Comment not found!");
    }

    // Respond with the updated comment
    res.status(200).json({
        success: true,
        message: "Comment 2 updated successfully",
        updatedComment
    });
});
// Deleting Comment by id

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;  

    
    if (!isValidObjectId(commentId)) {
        throw new apiError(400, "Invalid Comment Id!");
    }


    const deletedComment = await Comment.findByIdAndDelete(commentId);


    if (!deletedComment) {
        throw new apiError(404, "Comment not found!");
    }

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully"
    });
})


export {
        updateComment,
        addComment,
        getVideoComments,
        deleteComment,
        singleComment
}