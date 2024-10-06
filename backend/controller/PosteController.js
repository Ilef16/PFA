import express from 'express';
import { Poste } from '../models/Poste.js';

const CreatePoste=async(req,res)=>{
    try {
        const {description,etat,titre,recruteur}=req.body
     const NewPoste=  new Poste({
        description,etat,titre,recruteur
     })
     await NewPoste.save()
  
     res.status(200).json({success:true,message:"User Created Successfully.", NewPoste})
    } catch (error) {
      console.log(error)
    return  res.status(500).json({success:false,message:"Interl server eror"})
    }
}


///////Read api
const getPoste=async(req,res)=>{

    try {
      const postes= await Poste.find()
     if (!postes) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({postes})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
 }

 const getPosteByRec = async (req, res) => {
  const recruteurId = req.query.recruteurId;

  try { 
      const postes = await Poste.find({ recruteur: recruteurId }); 
      if (!postes ) {
          return res.status(404).json({ success: false, message: 'Aucun poste trouvé pour ce recruteur' });
      }
      
      res.status(200).json({postes});
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Une erreur s\'est produite lors de la récupération des postes' });
  }
};
 
 //////update user api
 const UpdatedPoste=async(req,res)=>{
  try {
      const postId=req.params.id
  
  const updatePost=await Poste.findByIdAndUpdate(postId,req.body,{new:true})
    if (!updatePost) {
       return res.status(404).json({ success: false, message: 'User not found' });
     }
      res.status(200).json({ success: true, message: 'User updated successfully', updatePost });
  } catch (error) {
      console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
 
//  // delet user ap
 const deletePoste=async(req,res)=>{
 try {
        const postId=req.params.id
    const deletPost= await Poste.findByIdAndDelete(postId)
    if (!deletPost) {
    return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
 } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: 'Internal server error' });
 }
}
export {CreatePoste,getPoste, UpdatedPoste,deletePoste,getPosteByRec}