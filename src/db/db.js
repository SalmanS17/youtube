import mongoose from "mongoose";
import {DB_Name} from "../constants.js";

const connectDb = async () =>{
    try {
    const  connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_Name}`)
     console.log(`\n MongoDb connected! DB Host: ${connectionInstance.connection.host}`);
     
    } catch (error) {
        console.log("MongoDb Connection error ", error);
        process.exit(1);
    }
}

export default connectDb;