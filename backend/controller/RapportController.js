import express from 'express';

import { Rapport } from '../models/Rapport.js';

const CreateRapport=async(req,res)=>{
    try {
        const {description,PDF,video}=req.body
     const NewRap=  new Rapport({
        description,PDF,video
     })
     await NewRap.save()
  
     res.status(200).json({success:true,message:"User Created Successfully.", NewRap})
    } catch (error) {
      console.log(error)
    return  res.status(500).json({success:false,message:"Interl server eror"})
    }
}


///////Read api
const getRapport=async(req,res)=>{

    try {
      const rapports= await Rapport.find()
     if (!rapports) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({rapports})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
 }
 
 //////update user api
 const UpdatedRapport=async(req,res)=>{
  try {
      const rapportId=req.params.id
  
  const updateRap=await Rapport.findByIdAndUpdate(rapportId,req.body,{new:true})
    if (!updateRap) {
       return res.status(404).json({ success: false, message: 'User not found' });
     }
      res.status(200).json({ success: true, message: 'User updated successfully', updateRap });
  } catch (error) {
      console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
 
//  // delet user ap
 const deleteRapport=async(req,res)=>{
 try {
        const rapportId=req.params.id
    const deletRap= await Rapport.findByIdAndDelete(rapportId)
    if (!deletRap) {
    return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
 } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: 'Internal server error' });
 }
}
export {CreateRapport,getRapport, UpdatedRapport,deleteRapport}