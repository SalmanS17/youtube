import {Router} from "express";
import {
        getVideoComments,
        addComment,
        updateComment,
        deleteComment,
        singleComment
} from "../controllers/comment.Controller.js";

const router = Router();

router.route("/add/comment/:id").post(addComment)
router.route("/get/:videoId").get(getVideoComments)
router.route("/single/comment/:commentId").get(singleComment)
router.route("/update/comment/:commentId").put(updateComment)
router.route("/delete/comment/:commentId").delete(deleteComment)


export default router;