import React from "react";
import { Box, Container, Grid, Link, List, ListItem, Typography } from "@mui/material";

const DetailedFooter = ({ content }) => {
  const { brand, socials, menus, copyright } = content;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {brand.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {brand.description}
            </Typography>
            {socials && ( // Vérifiez si socials est défini avant de l'utiliser
              <List>
                {socials.map((social, index) => (
                  <ListItem key={index}>
                    <Link href={social.link} color="inherit">
                      {social.icon}
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          {menus && menus.map((menu, index) => ( // Vérifiez si menus est défini avant de mapper
            <Grid item xs={6} md={2} key={index}>
              <Typography variant="h6" gutterBottom>
                {menu.name}
              </Typography>
              <List>
                {menu.items.map((item, idx) => (
                  <ListItem key={idx}>
                    <Link href={item.href} color="inherit">
                      {item.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DetailedFooter;