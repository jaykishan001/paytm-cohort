import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();

export const connectDb = async() => {
    try {
        const dbURL = process.env.MONGODB_URL;
        if(!dbURL){
            console.log("Db URL not specified");
            process.exit(1);
        };
        const ConnectionInstance = await mongoose.connect(dbURL);
        console.log(`MongoDB Connected: ${ConnectionInstance.connection.host}`);
    } catch (error) {
        console.error("Couldn't connect to MongoDB", error);
        process.exit(1);
    };
};

