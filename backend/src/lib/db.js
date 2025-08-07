import mongoose from "mongoose"

export async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected: "+conn.connection.host);  
    } catch (error) { 
        console.error("Error in DB Connection", error)
    }
}