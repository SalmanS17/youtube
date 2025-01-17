import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;

    let uploadResponse = null;
    try {
        // Ensure to await the Cloudinary upload
        uploadResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // Log the uploaded file URL (ensure the uploadResponse contains url)
        console.log("File is uploaded on Cloudinary", uploadResponse?.url);
    } catch (error) {
        console.error("Cloudinary upload failed", error);
    } finally {
        // Clean up the local file
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
    }
    return uploadResponse;
};

export { uploadOnCloudinary };
