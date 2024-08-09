import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB Connected...");
    }).catch(() => {
        console.log("MongoDB Connection Error: ", error);
    });