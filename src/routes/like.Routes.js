import {Router} from "express";
import {
   
        toggleVideoLike
} from "../controllers/like.Controller.js";

const router = Router();

router.route("/add/like/:id").post(toggleVideoLike)



export default router;