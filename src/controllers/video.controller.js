import mongoose, {isValidObjectId} from 'mongoose';
import {Video} from '../models/video.model.js';
import {User} from '../models/user.model.js';
// import { apiError } from "../utils/apiError.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { apiError } from '../utils/apiError.js';

// Publishing Videos
const publishVideo = asyncHandler(async (req, res, next) => {
    try {
        const { title, description } = req.body;
        // console.log("title", title, "description", description);

        // if () {
        //     throw new apiError(400, "All fields are required");
        // }

        if (!req.files || !req.files.videoFile) {
            console.log("req.files", req.files, "req.files.videoFile", req.files.videoFile);
            throw new apiError(400, "Both video and thumbnail files are required");
        }

        const videoLocalPath = req.files.videoFile[0]?.path;
        // const thumbnailLocalPath = req.files.thumbnail[0]?.path;

        if (!videoLocalPath) {
            throw new apiError(400, "Video file is required");
        }
        const avatar = await uploadOnCloudinary(videoLocalPath);

      

        const videoResult = await Video.create({
            title,
            description,
            videoFile: videoLocalPath || "",
            // thumbnail: thumbnailLocalPath || "",
            // owner: req.user._id,
            isPublished: true,
            duration: 0,
        });

        res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            video: videoResult
        });

    }  catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc',} = req.query;

    try { 
        // const page = preseInt(page);
        // const limit = parseInt(limit);

        let filter = {};
        if(query) {
            filter.title = { $regex: query, $options: 'i' };
        
        }
        // Sorting order of videos....
        const sortOrder = sortType === 'desc' ? -1 : 1;

        // Fetch videos with pagination and sorting....

        const videos = await Video.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)

        // Fetching all videos from database

        const totalVideos = await Video.countDocuments(filter);
        res.status(200).json({success: true, data: videos,
            pagination: {
                totalVideos,
                totalPages: Math.ceil(totalVideos / limit),
                currentPage: page,
                limit: limit,
                hasNextPage: page * limit < totalVideos,
                hasPrevPage: page > 1

            }
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }

// Getting video by ID

});
const getVideoById = asyncHandler(async (req, res) => {


    const videoId = req.params.id;
    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new apiError(404, "Video not found");
    }
    res.status(200).json({ success: true, data: video });
});


// Getting Video by Content

const getVideoByTitle = asyncHandler (async (req, res) =>{
    const { title } = req.body;
    console.log(req.body)
    
    if(!title) {
        throw new apiError(400,"Title is required..")
    }

    const video = await Video.findOne({title})

    if(!video) {
        throw new apiError (404, "Video not found")
    }

    res.status(200).json({success: true, video})
    console.log(`topic of the video is ${video.videoFile}`)
})

// Updating video...

const updateVideo = asyncHandler(async (req, res) => {
    const videoId = req.params.id;
    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new apiError(404, "Video not found");
    }

    const { title, description, videoFile } = req.body;
    if (!title || !description || !videoFile) {
        throw new apiError(400, "All fields are required");
    }
    video.videoFile = videoFile
    video.title = title;
    video.description = description;

    await video.save();

    res.status(200).json({ success: true, message: "Video updated successfully" });

});

const deleteVideo = asyncHandler(async (req, res) => {
    const videoId = req.params.id;
    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
          
    }
    // console.log("videoId", videoId);

    const video = await Video.findById(videoId);
    if (!video) {
        throw new apiError(404, "Video not found");
    }

    await video.deleteOne();


    res.status(200).json({ success: true, message: "Video deleted successfully" });
});

// Toggling status of the video

const togglePublishStatus = asyncHandler(async (req, res) => {
    const videoId = req.params.id;
    if (!isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid video ID");
    }
    // console.log("video", videoId);
    

    const video = await Video.findById(videoId);
    if (!video) {
        throw new apiError(404, "Video not found");
    }

    video.isPublished = !video.isPublished;
    await video.save();

    res.status(200).json({ success: true, message: "Publish status toggled successfully" });
});


export {
      togglePublishStatus,
      publishVideo,
      getAllVideos,
      getVideoById,
      updateVideo,
      deleteVideo,
      getVideoByTitle
    };