import { useState } from 'react';

// mui import
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// project import
import ModalUI from 'ui-component/ModalUI';
import useProducts from 'hooks/useProducts';
// utils import
import { lugaresDeCompra, presentacionDeProductos, estadoProdcuto } from 'utils/productsDataUtils';

const AddProductModal = ({ showModal, closeModal }) => {
  // dropdown options

  const [formData, setFormData] = useState({
    nombre: '',
    presentacion: '',
    marca: '',
    modelo: '',
    estado: '',
    stock: '',
    lugar: '',
    imagen: ''
  });

  console.log(formData);
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
              label="Nombre del Artículo"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} direction="row" mt={2}>
            <Autocomplete
              disablePortal
              id="combo-box-presentacion"
              options={presentacionDeProductos}
              sx={{ width: '60%' }}
              onChange={(e) => setFormData({ ...formData, presentacion: e.target.outerText.toUpperCase() })}
              renderInput={(params) => <TextField {...params} label="Presentación" />}
            />
            <TextField
              name="marca"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Marca"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} direction="row" mt={2}>
            <TextField
              name="modelo"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Modelo"
              variant="outlined"
            />
            <TextField
              name="stock"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              label="Stock"
              type="number"
              variant="outlined"
            />
          </Stack>
          <Stack spacing={2} mt={2}>
            <Autocomplete
              disablePortal
              id="combo-box-presentacion"
              options={estadoProdcuto}
              onChange={(e) => setFormData({ ...formData, estado: e.target.outerText })}
              renderInput={(params) => <TextField {...params} label="Estado" />}
            />
          </Stack>

          <Stack spacing={2} mt={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={lugaresDeCompra}
              onChange={(e) => setFormData({ ...formData, lugar: e.target.outerText.toUpperCase() })}
              renderInput={(params) => <TextField {...params} label="Lugar de Compra" />}
            />
            <p>Sube una foto de el artículo</p>
            <TextField
              name="image"
              onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
              color="secondary"
              id="outlined-basic"
              type="file"
              variant="standard"
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
        autoHideDuration={2000}
        open={showNotification}
        message="Artículo Agregado"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="info">Artículo Agregado</Alert>
      </Snackbar>
    </>
  );
};

AddProductModal.propTypes = {
  closeModal: PropTypes.func,
  showModal: PropTypes.bool
};

export default AddProductModal;
