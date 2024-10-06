import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Link } from "@mui/material";
import "./LoginRecruteur.css";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import PrimarySearchAppBar from "../layouts/Test1/PrimarySearchAppBar";

function LoginRecruteur() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.post("http://localhost:5000/api/loginRecruteur", {
        email,
        password,
      });
      const token = response.data.token;
      const utilisateurId = response.data.utilisateurId;
      const useremail = response.data.email;
      const recruteur = response.data.recruteur;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("utilisateurId", utilisateurId);
      sessionStorage.setItem("utilisateuremail", useremail);
      sessionStorage.setItem("recruteurId", recruteur);
      console.log("ID de l'utilisateur connecté :", utilisateurId);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Adresse e-mail ou mot de passe incorrect");
    }
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("utilisateuremail") &&
      sessionStorage.getItem("utilisateurId") &&
      sessionStorage.getItem("recruteurId")
    ) {
      window.location.href = "/dashboard";
    }
  }, []);

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));
  return (
    <>
      <PrimarySearchAppBar />
      <div className="register">
        <div className="register-cover"></div>
        <div className="register-content">
          <div className="title">
            <div className="form-container">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <Input
                    className="input"
                    type="email"
                    placeholder="Taper votre Email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    className="input"
                    type="password"
                    placeholder="Taper votre password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* <FormControlLabel class='FormControlLabel'
        control={<Android12Switch defaultChecked />}
        label="Remember me"
      /> */}
                <br />
                <Button className="button" type="submit" variant="contained" style={{ color:"white", backgroundColor:"#3876BF" }}>
                  Sign In
                </Button>
              </form>
              <div className="login-links">
                {/* <Link href="/signupCandidat" variant="body2">Forgot password?</Link> */}
              </div>
              <div className="compte">
                <Link href="/SignUpRecruteur" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginRecruteur;
