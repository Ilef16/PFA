//const Utilisateur=require("../models/Utilisateur.js")
import { Utilisateur } from "../models/Utilisateur.js";
import bcrypt from "bcrypt" ;
import jwt from 'jsonwebtoken';
// import { JsonWebTokenError } from "jsonwebtoken";

async function signup(req,res){
    try{
        const { email,password } =req.body;

        const hashedPassword=bcrypt.hashSync(password,10);
        await Utilisateur.create({ email, password: hashedPassword });
       
        res.sendStatus(200);
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
 
}

async function login(req,res){
    try{
        const { email,password } =req.body;

        const user=await Utilisateur.findOne({ email});
    
        if(!user) return res.sendStatus(401);
    
        const passwordMatch=bcrypt.compareSync(password,user.password);
        if(!passwordMatch) return res.sendStatus(401);
    
        const exp =Date.now() +1000*60*60*60*24*60;
        const token=jwt.sign({ sub: user._id, exp } ,process.env.SECRET);
    
        res.cookie("Authorization",token,{
            expires:new Date(exp),
            httpOnly: true,
            sameSite:'lax',
            secure: process.env.NODE_ENV === "production"
        })
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
    
}

function logout(req,res){
    try{
        res.clearCookie("Authorization");
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
   
}

function checkAuth(req,res){
    try{
        res.sendStatus(200)
    }catch(err){
        return res.sendStatus(400);
    }
 
    
}
export{signup,login,logout,checkAuth};