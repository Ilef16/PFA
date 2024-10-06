import express from 'express'
import { CreateUtilisateur, UpdatedUtilisateur, deleteUtilisateur, getUtilisateur } from '../controller/UtilisateurController.js'
import { CreateRecruteur, UpdatedRecruteur, deleteRecruteur, getRecruteur, getRecruteurById, loginRecruteur, logoutRecruteur, registerRecruteur } from '../controller/RecruteurController.js'
import { CreateCandidat, UpdatedCandidat, deleteCandidat, getCandidat, loginCandidat, logoutCandidat, registerCandidat } from '../controller/CandidatController.js'
import { CreatePoste, UpdatedPoste, deletePoste, getPoste, getPosteByRec } from '../controller/PosteController.js'
import { CreateRapport, UpdatedRapport, deleteRapport, getRapport } from '../controller/RapportController.js'
import { CreateVideo, UpdatedVideo, deleteVideo, getVideo } from '../controller/VideoController.js'
import { login,logout,signup } from '../controller/LoginController.js'
import { checkAuth } from '../controller/LoginController.js'
import { requireAuth } from '../middleware/requireAuth.js'
const routers=express.Router()

//login
routers.post('/signup',signup)
routers.post('/login',login)
routers.get('/logout',logout)
routers.get('/check-auth',requireAuth,checkAuth)

//Utilisateur
routers.post('/createUtilisateur',CreateUtilisateur)
routers.get('/get',getUtilisateur)
routers.put('/update/:id',UpdatedUtilisateur)
routers.delete('/delete/:id',deleteUtilisateur)

//Recrutteur
routers.post('/createRecruteur',CreateRecruteur)
routers.get('/getRec',getRecruteur)
routers.put('/updateRec/:id',UpdatedRecruteur)
routers.delete('/deleteRec/:id',deleteRecruteur)
routers.post('/loginRecruteur',loginRecruteur)
routers.post('/registerRecruteur',registerRecruteur)
routers.get('/logoutRecruteur',logoutRecruteur)
routers.post("/logoutRecruteur", logoutRecruteur);
routers.get('/getRecruteurById/:recruteurId',getRecruteurById)
//Candidat
routers.post('/createCandidat',CreateCandidat)
routers.get('/getCan',getCandidat)
routers.put('/updateCan/:id',UpdatedCandidat)
routers.delete('/deleteCan/:id',deleteCandidat)
routers.post('/loginCandidat',loginCandidat)
routers.post('/registerCandidat',registerCandidat)
routers.get('/logoutCandidat',logoutCandidat)
//Poste
routers.post('/createPoste',CreatePoste)
routers.get('/getPoste',getPoste)
routers.put('/updatePoste/:id',UpdatedPoste)
routers.delete('/deletePoste/:id',deletePoste)
routers.get('/getPosteByRec',getPosteByRec)

//Rapport
routers.post('/createRapport',CreateRapport)
routers.get('/getRap',getRapport)
routers.put('/updateRap/:id',UpdatedRapport)
routers.delete('/deleteRap/:id',deleteRapport)

//Video
routers.post('/createVideo',CreateVideo)
routers.get('/getVideo',getVideo)
routers.put('/updateVideo/:id',UpdatedVideo)
routers.delete('/deleteVideo/:id',deleteVideo)

export default routers