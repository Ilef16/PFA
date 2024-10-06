import React from "react";
import { Button, TextField, Box, Modal } from "@mui/material";
import { MdClose } from "react-icons/md";

const FormTable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <Modal open={true} onClose={handleclose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="close-btn2" onClick={handleclose}>
            <MdClose />
          </div>
          <TextField
            label="Description"
            id="description"
            name="description"
            onChange={handleOnChange}
            value={rest.description}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Etat"
            id="etat"
            name="etat"
            onChange={handleOnChange}
            value={rest.etat}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Titre"
            id="titre"
            name="titre"
            onChange={handleOnChange}
            value={rest.titre}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" style={{ color: "white", backgroundColor: "#3876BF", marginRight: "10px" }} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="contained" style={{ color: "white", backgroundColor: "#CA1D0E" }} onClick={handleclose}>
              Annuler
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default FormTable;