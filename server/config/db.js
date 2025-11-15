import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/test")
        console.log('MongoDB connected!');
    } catch (err) {
        console.log("error Has been occured while connecting to the DB")
        console.log(err)
    }
};
export default connectDB;