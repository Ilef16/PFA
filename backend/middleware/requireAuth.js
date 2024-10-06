import jwt from 'jsonwebtoken';
import { Utilisateur } from '../models/Utilisateur.js';

async function requireAuth(req, res, next){
    
    try{

        const token=req.cookies.Authorization;

        const decoded= jwt.verify(token, process.env.SECRET);


        if(Date.now() > decoded.exp) return res.sendStatus(401);



        const user= await Utilisateur.findById(decoded.sub);

        if(!user) return res.sendStatus(401);

        req.user=user;

        next()
    }catch(err){
        return res.sendStatus(401)
    }
}

export{requireAuth}