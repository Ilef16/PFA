import React, { useState } from 'react';
import axios from 'axios';
import './SignUpCandidat.css';
import { Button,Input,Link  } from '@mui/material'; 
import  PrimarySearchAppBar  from '../layouts/Test1/PrimarySearchAppBar';
function SignUpCandidat() {
  const [cin, setCin] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numTel, setNumTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = new FormData(event.currentTarget);
  
    const postData = {
      email: data.get('email'),
      password: data.get('password'),
      candidat: {
        cin: data.get('cin'),
        nom: data.get('nom'),
        prenom: data.get('prenom'),
        numTel: data.get('numTel'),
      },
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/registerCandidat', postData);
  
      if (response.status === 201) {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        window.location.href = '/LoginCandidat';
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
      <div className="form-container1" >
      <h2>Inscription Candidat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          
          <Input
            className="input"
            placeholder="Taper votre CIN"
            type="text"
            id="cin"
            name="cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            required
          />
        </div>
        <div>

          <Input
            className="input"
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
     
          <Input
            className="input"
            placeholder="Taper votre prenom"
            type="text"
            id="prenom"
            name="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
       
          <Input
            className="input"
            placeholder="Taper votre numTel"
            type="tel"
            id="numTel"
            name="numTel"
            value={numTel}
            onChange={(e) => setNumTel(e.target.value)}
            required
          />
        </div>
        <div>
  
          <Input
            className="input"
            type="email"
            placeholder="Taper votre email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          
          <Input
            className="input"
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
        <br/>
        <Button className="button"  type="submit" variant="contained">S'inscrire</Button>
        <div className="compte">
            <Link href="/LoginCandidat" variant="body2">J'ai déja un compte</Link>
          </div>
      </form>
    </div>
    </div>
    </div>
    </div>
</>
  );
}

export default SignUpCandidat;