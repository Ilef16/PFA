import express from 'express';

import {Utilisateur} from "../models/Utilisateur.js"

const CreateUtilisateur=async(req,res)=>{
    try {
        const {email,password,recruteur,candidat}=req.body
     const Newuser=  new Utilisateur({
        email,password,recruteur,candidat
     })
     await Newuser.save()
  
     res.status(200).json({success:true,message:"User Created Successfully.", Newuser})
    } catch (error) {
      console.log(error)
    return  res.status(500).json({success:false,message:"Interl server eror"})
    }
}


///////Read api
const getUtilisateur=async(req,res)=>{

    try {
      const users= await Utilisateur.find()
     if (!users) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({users})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
 }
 
 ////////update user api
 const UpdatedUtilisateur=async(req,res)=>{
  try {
      const userId=req.params.id
  
  const updateuser=await Utilisateur.findByIdAndUpdate(userId,req.body,{new:true})
    if (!updateuser) {
       return res.status(404).json({ success: false, message: 'User not found' });
     }
      res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
  } catch (error) {
      console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
  }
 }
 
 // delet user ap
 const deleteUtilisateur=async(req,res)=>{
 try {
        const userId=req.params.id
    const deletuser= await Utilisateur.findByIdAndDelete(userId)
    if (!deletuser) {
    return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
 } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: 'Internal server error' });
 }
}
export {CreateUtilisateur,getUtilisateur,UpdatedUtilisateur,deleteUtilisateur}