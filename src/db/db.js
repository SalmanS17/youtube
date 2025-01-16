import mongoose from "mongoose";
import {DB_Name} from "../constants.js";

const connectDb = async () =>{
    try {
    const  connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_Name}`)
     console.log(`\nMongoDb is connected`);
     
    } catch (error) {
        console.log("MongoDb Connection error ", error);
        process.exit(1);
    }
}

export default connectDb;