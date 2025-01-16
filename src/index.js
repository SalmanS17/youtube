//  require ('dotenv').config()
import constants from 'constants'
// import mongoose from "mongoose";
// import express from "express";
import connectDb from './db/db.js'
import app from './app.js'



connectDb()

.then(()=>{
    app.listen(process.env.PORT || 8000)
    console.log(`Server is running at port ${process.env.PORT}`);
    
})
.catch((err)=>{
    console.log("Database connection failed.", err);
    
})







// const app = express(); 
// (async () => {
//     try {
//         // Use process.env.DB_URL and DB_Name correctly
//         const DB_URL = process.env.DB_URL;
//         const DB_Name = process.env.DB_Name;

//         await mongoose.connect(`${DB_URL}/${DB_Name}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to MongoDB!");

//         // Handle app-level errors
//         app.on("error", (error) => {
//             console.error("App Error:", error);
//         });

//         // Start the server
//         const port = process.env.PORT || 3000; // Default to port 3000 if not defined
//         app.listen(port, () => {
//             console.log(`App is listening on port ${port}`);
//         });
//     } catch (error) {
//         console.error("Error starting the application:", error);
//         process.exit(1); // Exit the process on error
//     }
// })();
