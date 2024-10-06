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

const posteSchema=new Schema({
    description:{
        type:String,
        required:true,
    },
    etat:{
        type:String,
        required:true,
    },
    titre:{
        type:String,
        required:true,
    },
    recruteur: {
       type: Schema.Types.ObjectId, 
       ref: 'Recruteur',
       required: false, } // Référence vers le modèle Recruteur

});
const Poste = mongoose.model('poste',posteSchema);
export { Poste };
//module.exports= Poste;