/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Grid, Card, Button, IconButton, Menu, MenuItem, InputAdornment } from '@mui/material';
import Icon from '@mui/material/Icon';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import AddIcon from "@mui/icons-material/Add";



import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import authorsTableData from "layouts/tables/data/authorsTableData";

function Tables() {
  const [formData, setFormData] = useState({
    description: "",
    etat: "",
    titre: "",
    recruteur: null,
  });
  const [formDataEdit, setFormDataEdit] = useState({
    description: "",
    etat: "",
    titre: "",
    recruteur: null,
    _id: "",
  });
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const open = Boolean(anchorEl);
  const utilisateuremail = sessionStorage.getItem('utilisateuremail');
  const recruteurId = sessionStorage.getItem("recruteurId");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenForm = (mode) => {
    setFormMode(mode);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData({
      description: "",
      etat: "",
      titre: "",
      recruteur: recruteurId,
    });
    setFormDataEdit({
      description: "",
      etat: "",
      titre: "",
      recruteur: null,
      _id: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newPostData = {
      description: formData.description,
      etat: formData.etat,
      titre: formData.titre,
      recruteur: recruteurId,
    };
    try {
      const { data: responseData } = await axios.post("/createPoste", newPostData);
      if (responseData.success) {
        handleCloseForm();
        toast.success("Poste ajouté avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du poste:", error);
    }
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setOpenForm(true);
    setFormMode('edit');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data: responseData } = await axios.put(
        `/updatePoste/${formDataEdit._id}`,
        formDataEdit
      );
      handleCloseForm();
      if (responseData.success) {
        toast.success("Poste modifié avec succès");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    handleClose();
    navigate('/LoginRecruteur');
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Effectuer la recherche ici
    console.log('Recherche par description ou titre:', searchQuery);
  };

  const { columns, rows } = authorsTableData();

  return (
    <DashboardLayout>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid item>
          <DashboardNavbar />
        </Grid>
        <Grid item>
        <MDInput style={{ marginLeft:800 }}
            label="Rechercher par..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Rechercher"
                    onClick={handleSearch}
                    edge="end"
                  >
                    <Icon>search</Icon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            sx={navbarIconButton}
            size="small"
            disableRipple
            onClick={handleClick}
          >
            <Icon>account_circle</Icon>
          </IconButton>
          <Grid container direction="column">
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{
                horizontal: 'right',
                vertical: 'top',
              }}
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                <MenuItem>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{utilisateuremail}</div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                      Profile
                    </Link>
                  </div>
                </MenuItem>
                <div style={{ borderTop: '1px solid #e0e0e0', width: '100%', marginTop: '10px', paddingTop: '10px' }}>
                  <MenuItem onClick={handleLogout}>
                    <div style={{ fontSize: '14px' }}>Logout</div>
                  </MenuItem>
                </div>
              </div>
            </Menu>
          </Grid>

        </Grid>
      </Grid>
      <Button
        className="button"
        style={{
          backgroundColor: "#E1AA74",
          color: "white",
          marginTop: 40,
          marginLeft: 1150,
        }}
        onClick={() => handleOpenForm('add')}
      >
        <AddIcon />
        Ajouter un Poste
      </Button>

      

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card >
              <MDBox style={{  backgroundImage: 'linear-gradient(to right, #3876BF, #589DD0)', }}
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="#3876BF"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Postes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;