import express from 'express';
import bcrypt from "bcrypt" ;
import jwt from 'jsonwebtoken';
import {Recruteur} from '../models/Recruteur.js';
import { Utilisateur } from '../models/Utilisateur.js';



const loginRecruteur = async (req, res) => {
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
      res.status(200).json({ token, utilisateurId: util._id , email: util.email , recruteur: util.recruteur}); // Ajoutez l'ID du candidat à la réponse
  } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion' });
  }
};




const registerRecruteur = async (req, res) => {
  const { email, password, recruteur } = req.body;

  try {
    // Vérifiez si un candidat avec cet email existe déjà
    const existingRecruteur = await Utilisateur.findOne({ email });

    if (existingRecruteur) {
      return res.status(400).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà' });
    }

    // Hachez le mot de passe avant de le sauvegarder dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10); // Utilisez bcrypt pour hacher le mot de passe

    const { nom } = recruteur; // Déstructurez les valeurs de candidat

    const newRec = new Recruteur({
      nom
    });
    await newRec.save();

    // Créez un nouveau candidat
    const newUtilisateur = new Utilisateur({
      email,
      password: hashedPassword,
      recruteur: newRec._id
    });

    // Sauvegardez le candidat dans la base de données
    await newUtilisateur.save();

    res.status(201).json(newUtilisateur);
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription' });
  }
};


/*const logoutRecruteur = (req, res) => {
  console.log('Logging out token:', req.token);

  req.session.destroy((err) => {
  if (err) {
    return res.status(500).send({ message: "Failed to logout due to session error" });
  }

  res.clearCookie('sessionId'); 

  res.status(200).json({ message: "Successfully logged out" });
});
};*/
const logoutRecruteur = (req, res) => {
  // Déconnexion de l'utilisateur
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Failed to logout due to session error" });
    }
    
    // Redirection vers la page de connexion
    res.redirect("/loginRecruteur"); // Redirigez vers votre URL de connexion
  });
};


const CreateRecruteur=async(req,res)=>{
    try {
        const {nom}=req.body
     const NewRec=  new Recruteur({
        nom
     })
     await NewRec.save()
  
     res.status(200).json({success:true,message:"User Created Successfully.", NewRec})
    } catch (error) {
      console.log(error)
    return  res.status(500).json({success:false,message:"Interl server eror"})
    }
}


///////Read api
const getRecruteur=async(req,res)=>{

    try {
      const recs= await Recruteur.find()
     if (!recs) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({recs})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
  }
 //////update user api
 const UpdatedRecruteur=async(req,res)=>{
  try {
      const recId=req.params.id
  
  const updaterec=await Recruteur.findByIdAndUpdate(recId,req.body,{new:true})
    if (!updaterec) {
       return res.status(404).json({ success: false, message: 'User not found' });
     }
      res.status(200).json({ success: true, message: 'User updated successfully', updaterec });
  } catch (error) {
      console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
  }
 }
 
 const getRecruteurById = async (req, res) => {
  try {
    const { recruteurId } = req.params; // Récupérer l'ID du recruteur à partir des paramètres de la requête

    const recruteur = await Recruteur.findById(recruteurId);

    if (!recruteur) {
      return res.status(404).json({ success: false, message: "Recruteur non trouvé" });
    }

    res.status(200).json({ success: true, recruteur });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

//  // delet user ap
 const deleteRecruteur=async(req,res)=>{
 try {
        const recId=req.params.id
    const deletRec= await Recruteur.findByIdAndDelete(recId)
    if (!deletRec) {
    return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
 } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: 'Internal server error' });
 }
}
export {CreateRecruteur,getRecruteur, UpdatedRecruteur,deleteRecruteur,loginRecruteur,registerRecruteur,logoutRecruteur,getRecruteurById}