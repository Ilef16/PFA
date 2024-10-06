import React, { useState } from 'react';
import axios from 'axios';
import { Button,Input,Link  } from '@mui/material'; 
import './SignUpRecruteur.css';
import  PrimarySearchAppBar  from '../layouts/Test1/PrimarySearchAppBar';
function SignUpRecruteur() {
  
  const [nom, setNom] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = new FormData(event.currentTarget);
  
    const postData = {
      email: data.get('email'),
      password: data.get('password'),
      recruteur: {
        nom: data.get('nom')
      },
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/registerRecruteur', postData);
  
      if (response.status === 201) {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        window.location.href = '/LoginRecruteur';
      } else {
        throw new Error(response.data.message || 'Échec de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Échec de l\'inscription. Veuillez réessayer.');
    }
  };
  

  return (
    <>
        <PrimarySearchAppBar/>

 
    <div className="register">
        <div className="register-cover">
          </div>
          <div className="register-content">
          <div className="title">
          <div className="form-container" > 
      <h2>Inscription Recruteur</h2>
      <form onSubmit={handleSubmit}>
       
        <div>
          <Input  className="input"
           placeholder="Taper votre nom"
            type="text"
            id="nom"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
       
        
        <div>
        <Input  className="input"
           placeholder="Taper votre Email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
        <Input  className="input"
           placeholder="Taper votre password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div>{error}</div>}
        <Button className="button" type="submit" variant="contained" style={{ color:"white", backgroundColor:"#3876BF" }}>S'inscrire</Button>
        <div className="compte">
            <Link href="/LoginRecruteur" variant="body2">J'ai déja un compte</Link>
          </div>
      </form>
    </div>
    </div>
    </div>
    </div>

    </>
  );
}

export default SignUpRecruteur;
