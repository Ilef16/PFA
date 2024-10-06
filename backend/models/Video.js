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

const videoSchema=new Schema({
    poste: { type: Schema.Types.ObjectId, ref: 'Poste' , required: true}, // Référence vers le modèle Poste
    candidat: { type: Schema.Types.ObjectId, ref: 'Candidat', required: true }, // Référence vers le modèle Candidat
    rapport: { type: Schema.Types.ObjectId, ref: 'Rapport', required: false} // Référence vers le modèle Rapport

});
videoSchema.index({ poste: 1, candidat: 1 }, { unique: true });
const Video = mongoose.model('Video',videoSchema);
export { Video };