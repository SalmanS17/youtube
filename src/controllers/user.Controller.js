   // Registering user steps...
     // validation.
     // check if user already exist..., username, email
     // check for images, check for avatar
     // upload them to cloudinary, avatar
     // create user object - create entry in db
     // remove password and refresh token field from response
     // check for user creation
     // return
import { asyncHandler } from "../utils/asynHandler.js";
import {apiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
  
    const {fullName, email, username, password} = req.body
    console.log("email", email,"username", username, "password", password);
    
    if (
        [fullName, email, username,password].some((field) =>
        field?.trim() ==="")
    ) {
        throw new apiError(400, "All fields are required")
    }
   const exitedUser = User.findOne({
        $or: [{username}, {email}]
    })
    if(exitedUser){
        throw new apiError(409, "Username with email or username already exists ")
    }
     const avatarLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath =  req.files?.covreImage[0]?.path;

     if(!avatarLocalPath){
        throw new apiError(400, "Avatar file is required")
     }
     const avatar = await cloudinary(avatarLocalPath)
     const coverImage = await cloudinary(coverImageLocalPath)

     if(!avatar){
        throw new apiError(400, "Avatar file is required")
     }
     const user = await User.create({
        fulllname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
     })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser){
        throw new apiError(500,"Something went wrong while creating the user")
    }
    return res.status(201).json(
        new apiResponse(200, createdUser, "User Created Successfully")
    )

})

export {registerUser}