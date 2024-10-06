import express from 'express';
import bcrypt from "bcrypt" ;
import jwt from 'jsonwebtoken';

import {Candidat} from '../models/Candidat.js';
import { Utilisateur } from '../models/Utilisateur.js';

const loginCandidat = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Recherchez un candidat avec l'email fourni
      const util = await Utilisateur.findOne({ email });

      // Vérifiez si un candidat avec cet email existe
      if (!util) {
          return res.status(401).json({ message: 'Adresse e-mail incorrect' });
      }

      // Vérifiez si le mot de passe fourni correspond au mot de passe haché dans la base de données
      const passwordMatch = await  util.password ;

      if (!passwordMatch) {
          return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
      }

      // Si les identifiants sont valides, générez un jeton d'authentification
      const token = jwt.sign({ id: util._id }, 'votre_clé_secrète', { expiresIn: '1h' });

      // Renvoyer le jeton d'authentification dans la réponse
      res.status(200).json({ token, utilisateurId: util._id ,email: util.email, candidat: util.candidat}); // Ajoutez l'ID du candidat à la réponse
  } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion' });
  }
};



const registerCandidat = async (req, res) => {
  const { email, password, candidat } = req.body;

  try {
    // Vérifiez si un candidat avec cet email existe déjà
    const existingCandidat = await Utilisateur.findOne({ email });

    if (existingCandidat) {
      return res.status(400).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà' });
    }

    // Hachez le mot de passe avant de le sauvegarder dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10); // Utilisez bcrypt pour hacher le mot de passe

    const { cin, nom, prenom, numTel } = candidat; // Déstructurez les valeurs de candidat

    const newCan = new Candidat({
      cin,
      nom,
      prenom,
      numTel
    });
    await newCan.save();

    // Créez un nouveau candidat
    const newUtilisateur = new Utilisateur({
      email,
      password: hashedPassword,
      candidat: newCan._id
    });

    // Sauvegardez le candidat dans la base de données
    await newUtilisateur.save();

    res.status(201).json(newUtilisateur);
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription' });
  }
};


const logoutCandidat = (req, res) => {
  console.log('Logging out token:', req.token);

// You can destroy a session here if session-based
  req.session.destroy((err) => {
  if (err) {
    return res.status(500).send({ message: "Failed to logout due to session error" });
  }

  // Clear cookie if set during login
  res.clearCookie('sessionId'); // Adjust this to your cookie key

  res.status(200).json({ message: "Successfully logged out" });
});

// If not using sessions, just return success
// res.status(200).send({ message: "Successfully logged out" });
};








const CreateCandidat=async(req,res)=>{
    try {
        const {cin,nom,prenom,numTel}=req.body
     const NewCan=  new Candidat({
        cin,nom,prenom,numTel
     })
     await NewCan.save()
  
     res.status(200).json({success:true,message:"User Created Successfully.", NewCan})
    } catch (error) {
      console.log(error)
    return  res.status(500).json({success:false,message:"Interl server eror"})
    }
}


///////Read api
const getCandidat=async(req,res)=>{

    try {
      const cans= await Candidat.find()
     if (!cans) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({cans})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
 }
 
 //////update user api
 const UpdatedCandidat=async(req,res)=>{
  try {
      const canId=req.params.id
  
  const updateCan=await Candidat.findByIdAndUpdate(canId,req.body,{new:true})
    if (!updateCan) {
       return res.status(404).json({ success: false, message: 'User not found' });
     }
      res.status(200).json({ success: true, message: 'User updated successfully', updateCan });
  } catch (error) {
      console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
 
//  // delet user ap
 const deleteCandidat=async(req,res)=>{
 try {
        const canId=req.params.id
    const deletCan= await Candidat.findByIdAndDelete(canId)
    if (!deletCan) {
    return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
 } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: 'Internal server error' });
 }
}
export {CreateCandidat,getCandidat, UpdatedCandidat,deleteCandidat,loginCandidat,registerCandidat,logoutCandidat}