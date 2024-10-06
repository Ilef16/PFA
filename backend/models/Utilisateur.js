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

const utilisateurSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    recruteur: {
        type: Schema.Types.ObjectId,
        ref: 'Recruteur', // Référence au modèle de Recruteur
        required: false,
    },
    candidat: {
        type: Schema.Types.ObjectId,
        ref: 'Candidat', // Référence au modèle de Candidat
        required: false,
    }
});

const Utilisateur = mongoose.model('utilisateur', utilisateurSchema);

export { Utilisateur };
