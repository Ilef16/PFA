import React from "react";
import { Typography, Box, Grid, Link, Divider } from "@mui/material";
import Facebook from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import GitHubIcon from "@mui/icons-material/GitHub";

function FooterOne() {
  const date = new Date().getFullYear();

  const socialIcons = [
    { icon: <Facebook fontSize="small" sx={{ color: "#666", fontWeight: "bold" }} />, link: "https://www.facebook.com/CreativeTim/" },
    { icon: <TwitterIcon fontSize="small" sx={{ color: "#666", fontWeight: "bold" }} />, link: "https://twitter.com/creativetim" },
    { icon: <Instagram fontSize="small" sx={{ color: "#666", fontWeight: "bold" }} />, link: "https://www.instagram.com/creativetimofficial/" },
    { icon: <PinterestIcon fontSize="small" sx={{ color: "#666", fontWeight: "bold" }} />, link: "https://ro.pinterest.com/thecreativetim/" },
    { icon: <GitHubIcon fontSize="small" sx={{ color: "#666", fontWeight: "bold" }} />, link: "https://github.com/creativetimofficial" },
  ];

  const footerContent = {
    brand: {
      
    },
    menus: [
      {
        name: "Company",
        items: [
          { name: "About Us", href: "https://www.creative-tim.com/" },
          { name: "Team", href: "https://www.creative-tim.com/presentation" },
          { name: "Products", href: "https://www.creative-tim.com/templates/react" },
          { name: "Blog", href: "https://www.creative-tim.com/blog" },
          { name: "License", href: "https://www.creative-tim.com/license" },
        ],
      },
    ],
    copyright: (
      <>
        Copyright &copy; {date} Material Design by{" "}
        <Link
          href="https://www.creative-tim.com"
          target="_blank"
          rel="noreferrer"
          color="gray"
          underline="none" // suppression du soulignement
          
          fontFamily="system-ui"
     
           // texte en gras
        >
          Creative Tim
        </Link>
        .
      </>
    ),
  };

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f5f5f5',
        padding: '20px 0',
      
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        fontFamily: 'system-ui',
        mt: 'auto', 
      }}
    >
    {/* Contenu du footer */}
 
      <Grid container justifyContent="center" spacing={2}>
        
        <Grid item xs={12}>
          <Typography variant="h6" align="center" gutterBottom fontWeight="bold"> {/* texte en gras */}
            {footerContent.brand.name}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {footerContent.menus.map((menu, index) => (
              <Grid item key={index}>
                {menu.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    sx={{
                      mx: 2,
                      my: 1, // Ajout de l'espace vertical
                      color: "#666", // Couleur grise
                      fontWeight: "light", // texte en gras
                      textDecoration: "none", // suppression du soulignement
                      fontSize: "1.2rem",
                      fontFamily: "system-ui", // Taille de police augmentée
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Grid container justifyContent="center" spacing={2}>
            {socialIcons.map((social, index) => (
              <Grid item key={index}>
                <Link href={social.link} sx={{ mx: 1 }}>
                  {social.icon}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
       
        <Grid item xs={12} sx={{ marginTop: 3 }}>
          <Divider />
        </Grid>
       
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Typography variant="body2" align="center" color="textLight">
            {footerContent.copyright}
          </Typography>
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default FooterOne;
