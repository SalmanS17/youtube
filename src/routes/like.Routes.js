import {Router} from "express";
import {
   
        toggleVideoLike,
        toggleCommentLike

} from "../controllers/like.Controller.js";

const router = Router();

router.route("/add/like/:videoId").post(toggleVideoLike)
router.route("/add/commentlike/:commentId").post(toggleCommentLike)



export default router;