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

const rapportSchema=new Schema({
    description:{
        type:String,
        required:true,
    },
    PDF:{
        type:String,
        required:true,
    },
    video: { 
      type: Schema.Types.ObjectId,
       ref: 'Video', 
       unique: true ,
      // unique: false ,
       required: false,} // Référence vers le modèle Video
});
const Rapport = mongoose.model('rapport',rapportSchema);
export { Rapport };
//module.exports= Rapport;