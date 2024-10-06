import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { useNavigate, Link } from "react-router-dom";
import yourImage from "../../images/two-business-partners-working-in-office.png";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import FooterOne from "componentfooter/FooterOne";

const Test1 = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/LoginRecruteur");
  };


  const handleLogin1 = () => {
    navigate("/LoginCandidat");
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Grid container spacing={2} alignItems="center">
        {/* Partie gauche avec deux lignes de texte */}
        <Grid item xs={16} md={6}>
          <Box p={2}>
            <Typography variant="h5" gutterBottom align="center">
              <div style={{ fontFamily: "cursive", fontSize: 40 }}>
                <span>Bienvenue dans notre</span>
              </div>
              <div>
                <span style={{ fontFamily: "cursive", fontSize: 40 }}>plateforme </span>
                <span style={{ fontFamily: "cursive", fontSize: 40 }}>d</span>
                <span style={{ fontFamily: "cursive", fontSize: 40 }}>e</span>
                <span style={{ color: "#FF5722", fontFamily: "cursive", fontSize: 40 }}> </span>
                <span style={{ color: "#3876BF", fontFamily: "cursive", fontSize: 40 }}>
                  Recrutement
                </span>
              </div>
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleLogin}
                variant="contained"
                style={{ backgroundColor: "#3876BF", color: "white", marginRight: "10px" }}
              >
                Espace Recruteur
              </Button>
              <Button
                onClick={handleLogin1}
                variant="contained"
                style={{ backgroundColor: "#E1AA74", color: "white", marginLeft: "10px" }}
              >
                Espace Candidat
              </Button>
            </div>
            {/* <Button
              variant="contained"
              style={{ marginLeft: "10px", backgroundColor: "#E1AA74", color: "white" }}
              component={Link}
              to=""
            >
              Espace Candidat
            </Button> */}

          </Box>
        </Grid>

        {/* Partie droite avec une image */}
        <Grid item xs={6} md={6}>
          <img
            className="secOneRightImage"
            src={yourImage}
            alt="Deux partenaires travaillant au bureau"
            style={{
              maxWidth: "60%",
              height: "auto",
              marginTop: 100,
              marginRight: 200,
              scale: 0.8,
            }}
          />
        </Grid>
      </Grid>
      <FooterOne />
    </>
  );

};

export default Test1;
