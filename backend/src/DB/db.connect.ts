import Mongoose from "mongoose";
const mongoUri = process.env.MONGO_URI || '';

export const connectDB = async () => {
    try {
        await Mongoose.connect(mongoUri)
    } catch(e) {
        throw e
    }
}