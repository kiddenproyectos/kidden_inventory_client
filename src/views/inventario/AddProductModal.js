import { useState } from 'react';

// mui import
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// project import
import ModalUI from 'ui-component/ModalUI';
import useProducts from 'hooks/useProducts';
// utils import

const AddProductModal = ({ showModal, closeModal }) => {
  // dropdown options

  const [formData, setFormData] = useState({
    nombre: '',
    presentacion: '',
    marca: '',
    modelo: '',
    estado: '',
    stock: '',
    lugar: ''
  });

  const handleChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleInputChange = (e) => {
    handleChange(e, setFormData);
  };

  const [showNotification, setShowNotification] = useState(false);

  const { addProduct } = useProducts();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowNotification(false);
  };

  const onSubmitModal = () => {
    // promise linked to the result of adding data
    return addProduct(formData).then(() => {
      closeModal();
      setShowNotification(true);
    });
  };

  return (
    <>
      <Modal
        open={showModal}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <ModalUI title={'Agregar Artículo'} closeModal={closeModal}>
          <Stack spacing={2} mt={2}>
            <TextField
              name="nombre"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} mt={2}>
            <TextField
              name="presentacion"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Presentacion"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} mt={2}>
            <TextField
              name="marca"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Marca"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} mt={2}>
            <TextField
              name="modelo"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Modelo"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} mt={2}>
            <TextField
              name="estado"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Estado"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} mt={2}>
            <TextField
              name="stock"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Stock"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} mt={2}>
            <TextField
              name="lugar"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Lugar de compra"
              variant="outlined"
            />
          </Stack>

          <Stack mt={2}>
            <Button onClick={onSubmitModal} size="medium" variant="contained">
              Agregar
            </Button>
          </Stack>
        </ModalUI>
      </Modal>
      <Snackbar
        autoHideDuration={3000}
        open={showNotification}
        message="Usuario Agregado"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="info">Usuario Agregado</Alert>
      </Snackbar>
    </>
  );
};

AddProductModal.propTypes = {
  closeModal: PropTypes.func,
  showModal: PropTypes.bool
};

export default AddProductModal;
