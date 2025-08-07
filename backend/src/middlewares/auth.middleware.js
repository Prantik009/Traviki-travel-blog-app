import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectedRoute = async (req, res, next)=> {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: "Unautorised - No token Provided"})
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        if(!decoded) return res.status(401).json({ message: "Unauthorised - Invalid Token"}) 
        
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) return res.status(404).json({ message: " User not found."})

        req.user = user; // intialize the user found by id to the body  and send it to next function
        
        next()
    } catch (error) {
        
    }
}