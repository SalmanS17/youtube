import {Playlist} from "../models/playlist.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { isValidObjectId } from "mongoose";

// ✅ Create Playlist
const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw new apiError(400, "Playlist name and description are required");
    }

    const existingPlaylist = await Playlist.findOne({ name });
    if (existingPlaylist) {
        throw new apiError(400, "Playlist with this name already exists");
    }

    const newPlaylist = new Playlist({
        name,
        description,
        Videos: [],  // Ensure this field exists in your schema
        // owner: req.user.id,  // Assuming `req.user` exists
    });

    await newPlaylist.save();

    res.status(201).json({
        success: true,
        message: "Playlist created successfully",
        playlist: newPlaylist,
    });
});

// ✅ Add Video to Playlist
const addVideo = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { videoId } = req.body; // Use `videoId` since it's an ObjectId reference

    if (!videoId || !playlistId) {
        throw new apiError(400, "Please provide a valid playlist ID and video ID");
    }

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid Playlist ID or Video ID");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
    }

    // Ensure `Videos` field exists (fix case sensitivity)
    if (!playlist.Videos) {
        playlist.Videos = [];
    }

    // Add the video to the playlist's Videos array
    playlist.Videos.push(videoId);
    const updatedPlaylist = await playlist.save();

    res.status(200).json({
        success: true,
        message: "Video added successfully",
        playlist: updatedPlaylist,
    });
});

// Getting Playlist by id..

const getPlaylistById = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        throw new apiError(400, "Please provide a valid Id")
    }

    const playlist = await Playlist.findById(id)
    if(!playlist){
        throw new apiError(404, "Playlist not found!")
    }
    res.status(200).json({success: true, playlist})
});

// Getting Playlist by Name..

const getPlaylistByName = asyncHandler(async (req, res) =>{
    const { name } = req.body
    // console.log(req.body)
     
    if (!name || typeof name !== "string") {
        throw new apiError(400, "Please provide a valid playlist name!");
    }

    const playlist = await Playlist.findOne({ name });

    if (!playlist) {
        throw new apiError(404, "Playlist not found!");
    }

    // res.status(200).json({ success: true, Videos: playlist.Videos });
    res.status(200).json({ success: true, playlist});   
    
});

// Removing Video from Playlist....

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!playlistId || !videoId) {
        throw new apiError(400, "playlistId and videoId are required!");
    }

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid playlistId or videoId!");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new apiError(404, "Playlist not found!");
    }

    // Remove videoId from the playlist's Videos array
    playlist.Videos = playlist.Videos.filter((id) => id.toString() !== videoId);
    
    await playlist.save();

    res.status(200).json({ success: true, message: "Video removed from playlist successfully" });
});

// Deleting playlist...

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid playlist id!");
    }

    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new apiError(404, "Playlist not found!");
    }

    // Delete the playlist
    await playlist.deleteOne();

    res.status(200).json({ success: true, message: "Playlist deleted successfully" });
});




export { 
     createPlaylist,
     addVideo,
     getPlaylistById, 
     getPlaylistByName,
     removeVideoFromPlaylist,
     deletePlaylist
    }; 