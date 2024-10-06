import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Connexion à la base de données
mongoose.connect("mongodb://127.0.0.1:27017/react-app")
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.error("Erreur lors de la connexion à la base de données :", err);
  }
);

const recruteurSchema=new Schema({
    nom:{
        type:String,
        required:true,
    }
});
const Recruteur = mongoose.model('recruteur',recruteurSchema);
export { Recruteur };

// module.exports= Recruteur;