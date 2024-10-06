import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Connexion à la base de données
mongoose.connect("mongodb://127.0.0.1:27017/react-app")
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.error("Erreur lors de la connexion à la base de données :", err);
  });

const candidatSchema=new Schema({
    cin:{
        type:Number,
        required:true,
    },
    nom:{
        type:String,
        required:true,
    },
    prenom:{
        type:String,
        required:true,
    },
    numTel:{
        type:Number,
        required:true,
    }
});
const Candidat = mongoose.model('candidat',candidatSchema);

export { Candidat };
//module.exports= Candidat;