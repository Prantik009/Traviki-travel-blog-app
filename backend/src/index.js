import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import postRoutes from "./routes/post.route.js"
import {connectDB} from "./lib/db.js"

import { app, server } from "./lib/socket.js"

dotenv.config()

// app.use(cors({
//   origin: process.env.NODE_ENV === "production" ? ["https://traviki-travel-blog-app.onrender.com"] : ["http://localhost:5173"],
//   credentials: true,
// }));


app.use(cors({
  origin: process.env.NODE_ENV === "production" ? ["https://traviki-travel-blog-app.onrender.com"] : ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.options("*", cors()); // Optional fallback

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT


app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/post", postRoutes)

server.listen(PORT, ()=> { console.log("Server Listening to port:", PORT), connectDB()} )