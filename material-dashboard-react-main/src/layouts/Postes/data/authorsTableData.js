import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import FormTable from '../FormTable';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Warning } from '@mui/icons-material';

axios.defaults.baseURL = "http://localhost:5000/api/";

function Data() {
  const [utilisateuremail, setutilisateuremail] = useState('');
  const [utilisateurId, setutilisateureId] = useState('');
  const [recruteurId, setrecruteurId] = useState('');
  const [formData, setFormData] = useState({
    description: "",
    etat: "",
    titre: "",
    recruteur: null
  });
  const [formDataEdit, setFormDataEdit] = useState({
    description: "",
    etat: "",
    titre: "",
    recruteur: null,
    _id: ""
  });
  const [data, setData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [editingPost, setEditingPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(null);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recruteurId = sessionStorage.getItem('recruteurId');
    if (recruteurId) {
      setrecruteurId(recruteurId);
    }
    const newPostData = {
      description: formData.description,
      etat: formData.etat,
      titre: formData.titre,
      recruteur: recruteurId
    };
    try {
      const data = await axios.post("/createPoste", newPostData);
      console.log(data);
      if (data.data.success) {
        setOpenForm(false);
        setFormData({
          description: "",
          etat: "",
          titre: "",
          recruteur: recruteurId
        });
        toast.success("Poste ajouté avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du poste:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/deletePoste/${postId}`);
      toast.success("Poste supprimé avec succès");
      handleCloseDialog();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const utilisateuremail2 = sessionStorage.getItem('utilisateuremail');
    if (utilisateuremail2) {
      setutilisateuremail(utilisateuremail2);
    }

    const utilisateurId = sessionStorage.getItem('utilisateurId');
    if (utilisateurId) {
      setutilisateureId(utilisateurId);
    }
    const recruteurId = sessionStorage.getItem('recruteurId');
    if (recruteurId) {
      setrecruteurId(recruteurId);
    }

    async function fetchData() {
      try {
        const recruteurId = sessionStorage.getItem('recruteurId');
        if (recruteurId) {
          setrecruteurId(recruteurId);
        }

        const response = await axios.get('/getPosteByRec', {
          params: { recruteurId: recruteurId }
        });

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [data]);

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditingPost(el);
    setOpenForm(true);
    setFormMode('edit');
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseEditForm = () => {
    setOpenForm(false);
    setEditingPost(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data: responseData } = await axios.put(`/updatePoste/${formDataEdit._id}`, formDataEdit);
      handleCloseEditForm();
      if (responseData.success) {
        toast.success("Poste modifié avec succès");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDialog = (id) => {
    setPostId(id);
    setOpen(true);
  };

  const Author = ({ description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const Job = ({ etat }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption">{etat}</MDTypography>
    </MDBox>
  );

  const Title = ({ titre }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography variant="caption">{titre}</MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "Description", accessor: "author", width: "30%", align: "left" },
    { Header: "Etat", accessor: "function", width: "30%", align: "left" },
    { Header: "Titre", accessor: "status", width: "30%", align: "left" },
    { Header: "Actions", accessor: "action", width: "10%", align: "center" }
  ];

  const rows = [
    ...(data.postes || []).map((elm, index) => ({
      author: <Author description={elm.description} />,
      function: <Job etat={elm.etat} />,
      status: <Title titre={elm.titre} />,
      action: (
        <MDTypography component="div" variant="caption" color="text" fontWeight="medium" display="flex" justifyContent="space-between">
        <Button variant="contained" className='btn btn-edit' style={{ backgroundColor: '#3876BF', color: 'white', marginRight: '10px' }} onClick={() => handleEdit(elm)}>
          <EditIcon />
        </Button>
        <Button variant="contained" className='btn btn-edit' style={{ backgroundColor: '#3876BF', color: 'white'}} onClick={() => handleOpenDialog(elm._id)}>
          <DeleteIcon />
        </Button>
          <div className="container">
            <Dialog
              open={open}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
            >
              <DialogTitle id="alert-dialog-title" style={{ position: 'relative' }
}>
                <IconButton color="#FCC336" fontWeight="200">
                  <Warning />
                </IconButton>
                Confirmation
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Êtes-vous sûr de vouloir supprimer ce poste ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} style={{ color: 'white', backgroundColor: '#CA1D0E' }}>
                  Non
                </Button>
                <Button onClick={handleDelete} style={{ color: 'white', backgroundColor: '#3876BF' }} autoFocus>
                  Oui
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </MDTypography>
      )
    }))
  ];

  return {
    columns,
    rows,
    handleOnChange,
    handleUpdate,
    handleEditOnChange,
  };
}

export default Data;
