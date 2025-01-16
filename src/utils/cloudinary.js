import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key:    process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null
        // uploading the file on cloudinary
        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response;       
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the localy saved operation got failed
        return null
    }
}
export {uploadOnCloudinary}