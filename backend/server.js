import express from "express";
import dbCon from "./utils/db.js";
import dotenv from 'dotenv'
import routers from "./routes/routes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config()

const app=express()

dbCon()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: true,
        Credential: true
    }
   
))
app.use('/api',routers)
app.listen(process.env.PORT,()=>{
    console.log('server is running')
})