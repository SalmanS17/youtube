import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["video/mp4", "video/mkv", "video/webm"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only MP4, MKV, and WEBM allowed."), false);
    }
};
    
 export const upload = multer({
     storage, fileFilter
 })