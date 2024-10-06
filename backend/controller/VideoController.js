import express from 'express';

import { Video } from '../models/Video.js';

const CreateVideo=async(req,res)=>{
    try {
        const {poste,candidat,rapport}=req.body
     const NewVideo=  new Video({
        poste,candidat,rapport
     })
     await NewVideo.save()
  
     res.status(200).json({success:true,message:"User Created Successfully.", NewVideo})
    } catch (error) {
      console.log(error)
    return  res.status(500).json({success:false,message:"Interl server eror"})
    }
}


///////Read api
const getVideo=async(req,res)=>{

    try {
      const videos= await Video.find()
     if (!videos) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({videos})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
 }
 
 //////update user api
 const UpdatedVideo=async(req,res)=>{
  try {
      const videoId=req.params.id
  
  const updateVideo=await Video.findByIdAndUpdate(videoId,req.body,{new:true})
    if (!updateVideo) {
       return res.status(404).json({ success: false, message: 'User not found' });
     }
      res.status(200).json({ success: true, message: 'User updated successfully', updateVideo });
  } catch (error) {
      console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
 
//  // delet user ap
 const deleteVideo=async(req,res)=>{
 try {
        const videpId=req.params.id
    const deletVideo= await Poste.findByIdAndDelete(videpId)
    if (!deletVideo) {
    return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
 } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: 'Internal server error' });
 }
}
export {CreateVideo,getVideo, UpdatedVideo,deleteVideo}