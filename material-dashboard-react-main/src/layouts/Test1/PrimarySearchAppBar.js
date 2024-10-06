import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const WhiteAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#3876BF",
  height: 60,
}));

const PrimarySearchAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [setOpen] = useState(false);
  const [utilisateuremail, setUtilisateuremail] = useState("");

  useEffect(() => {
    const utilisateuremail2 = sessionStorage.getItem("utilisateuremail");
    if (utilisateuremail2 !== null) {
      setUtilisateuremail(utilisateuremail2);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <WhiteAppBar position="static">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
        <Box sx={{ display: "flex", alignItems: "center" }}>
  <Typography
    variant="h6"
    color="#FFFFFF"
    fontFamily="cursive"
    noWrap
    component={Link}
    to="/"
    sx={{
      display: { xs: "none", sm: "block" },
      marginLeft: "2cm",
      textDecoration: "none",
      marginTop: "15px", // Augmentez cette valeur pour déplacer vers le bas
    }}
  >
    Recrutement
  </Typography>
</Box>
          {/* <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="inherit"
            marginTop="20"
          >
            <Avatar />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem style={{ marginTop: 0 }}>
              <div>{utilisateuremail}</div>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link style={{ textDecoration: "none", color: "inherit" }}>Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                Logout
              </Link>
            </MenuItem>
          </Menu> */}
        </Box>
      </WhiteAppBar>
    </Box>
  );
};

export default PrimarySearchAppBar;
