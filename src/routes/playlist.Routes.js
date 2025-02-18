import { Router } from "express";

import {
     addVideo, 
     createPlaylist,
     getPlaylistById,
     getPlaylistByName,
     removeVideoFromPlaylist,
     deletePlaylist
     } from "../controllers/playlist.Controller.js";

const router = Router();

router.route("/create/list").post(createPlaylist)
router.route("/add/Video/:playlistId").post(addVideo)
router.route("/get/playlist/:id").get(getPlaylistById)
router.route("/name").get(getPlaylistByName)
router.route("/delete/:playlistId/:videoId").delete(removeVideoFromPlaylist);
router.route("/playlist/delete/:playlistId").delete(deletePlaylist)



export default router
