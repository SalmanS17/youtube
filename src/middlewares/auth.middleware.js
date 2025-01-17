import { asyncHandler } from "../utils/asynHandler.js"
import { apiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


const verifyJwt = asyncHandler(async (req, res, next) => {
   try {
    const token =  req.cookies?.accessToken || req.header("Auhorization")?.replace("Bearer ", "")
     if(!token){
         throw new apiError(401, "Unauthorized")
     }
 
    const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
 
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
 
     if(!user){
          throw new apiError(401, "Invalid Access Token")
     }
 
     req.user = user;
     next()
   } catch (error) {
      throw new apiError(401, "Invalid Acces Token")
   }
})

export {verifyJwt}