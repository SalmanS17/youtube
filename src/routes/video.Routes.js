import {Router} from 'express';
// import { publishVideo } from '../controllers/video.controller';
// import { verifyJwt } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
     togglePublishStatus,
     publishVideo,
     getAllVideos,
     getVideoById,
     updateVideo,
     deleteVideo,
     getVideoByTitle
    } from '../controllers/video.controller.js';


const router = Router();
// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/upload")
    // .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
           
            
        ]),
        publishVideo
    );

router.route("/allvideos").get(getAllVideos)
router.route("/video/:id").get(getVideoById)
router.route("/update/:id").get(updateVideo)
router.route("/delete/:id").delete(deleteVideo)
// router.route("/status/:id").delete(deleteVideo)
router.route("/publish/:id").patch(togglePublishStatus);
router.route("/title").get(getVideoByTitle)



  
// router
//     .route("/:videoId")
//     .get(getVideoById)
//     .delete(deleteVideo)
//     .patch(upload.single("thumbnail"), updateVideo);

// router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router
