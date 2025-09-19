/* eslint-disable */
import { useEffect, useState } from 'react';

// mui import
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// project import
import ModalUI from 'ui-component/ModalUI';
// utils import
import { lugaresDeCompra, presentacionDeProductos, estadoProdcuto, unidadesDeProductos } from 'utils/productsDataUtils';

const AddProductModal = ({ addProduct, showModal, closeModal }) => {
  // dropdown options
  const [showOptionalBox, setShowOptionalBox] = useState('si');

  const [formData, setFormData] = useState({
    nombre: '',
    presentacion: '',
    marca: '',
    modelo: '',
    estado: '',
    stock: '',
    lugar: '',
    imagen: '',
    almacen: '',
    minima: '',
    caja: showOptionalBox,
    piezasPorCaja: '',
    unidad: '',
    fechaCaducidad: ''
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

  const [showNotificationSuccess, setShowNotificationSuccess] = useState(false);
  const [showNotificationError, setShowNotificationError] = useState(false);

  // const { addProduct } = useProducts();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowNotificationSuccess(false);
    setShowNotificationError(false);
  };

  const onSubmitModal = () => {
    // promise linked to the result of adding data
    return addProduct(formData).then((response) => {
      if (response.error) {
        setShowNotificationError(true);
      } else {
        closeModal();
        setShowNotificationSuccess(true);
        setFormData({ nombre: '', presentacion: '', marca: '', modelo: '', estado: '', stock: '', lugar: '', imagen: '', almacen: '' });
      }
    });
  };

  const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main
    }
  }));

  function MyFormControlLabel(props) {
    // useEffect(() => {
    //   setFormData({ ...formData, caja: showOptionalBox });
    // }, [formData]);

    const radioGroup = useRadioGroup();
    let checked = false;
    if (radioGroup) {
      checked = radioGroup?.value === props?.value;
    }

    return (
      <StyledFormControlLabel
        onChange={(e) => {
          setShowOptionalBox(e.target.value);
          setFormData({ ...formData, caja: e.target.value });
        }}
        checked={checked}
        {...props}
      />
    );
  }

  return (
    <>
      <Modal
        open={showModal}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <ModalUI title={'Agregar Artículo'} closeModal={closeModal}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack spacing={2} mt={2}>
              <TextField
                required
                name="nombre"
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Nombre del Artículo"
                variant="outlined"
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={2}>
              <Stack sx={{ width: '50%' }}>
                <FormLabel>Tipo de paquete</FormLabel>
                <RadioGroup row name="use-radio-group" defaultValue="si">
                  <MyFormControlLabel value="si" label="Caja" control={<Radio />} />
                  <MyFormControlLabel value="no" label="Otro" control={<Radio />} />
                </RadioGroup>
              </Stack>
              {showOptionalBox === 'si' ? (
                <TextField
                  name="cantidad-piezas-caja"
                  required
                  sx={{ width: '50%' }}
                  onChange={(e) => handleInputChange(e)}
                  color="secondary"
                  id="outlined-basic"
                  label="Piezas por caja"
                  type="number"
                  variant="outlined"
                />
              ) : (
                <Autocomplete
                  disablePortal
                  id="combo-box-presentacion"
                  options={presentacionDeProductos}
                  sx={{ width: '50%' }}
                  onChange={(e) => setFormData({ ...formData, presentacion: e.target.outerText.toUpperCase() })}
                  renderInput={(params) => <TextField {...params} label="Paquete" />}
                />
              )}
            </Stack>
            <Stack>
              {showOptionalBox === 'si' ? (
                <Stack direction="row">
                  <TextField
                    name="almacen"
                    sx={{ width: '50%' }}
                    required
                    onChange={(e) => handleInputChange(e)}
                    color="secondary"
                    id="outlined-basic"
                    label="Numero de Cajas"
                    type="number"
                    variant="outlined"
                  />
                  <p style={{ marginLeft: '10px', fontSize: '18px' }}>Cajas</p>
                </Stack>
              ) : (
                <Stack direction="row" spacing={2}>
                  <TextField
                    name="almacen"
                    sx={{ width: '70%' }}
                    required
                    onChange={(e) => handleInputChange(e)}
                    color="secondary"
                    id="outlined-basic"
                    label="Existencia"
                    type="number"
                    variant="outlined"
                  />
                  <Autocomplete
                    sx={{ width: '30%' }}
                    required
                    disablePortal
                    id="combo-box-demo"
                    options={unidadesDeProductos}
                    onChange={(e) => setFormData({ ...formData, unidad: e.target.outerText.toUpperCase() })}
                    renderInput={(params) => <TextField {...params} label="Unidad" />}
                  />
                </Stack>
              )}
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
                required
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Stock"
                type="number"
                variant="outlined"
              />
            </Stack>
            <Stack spacing={2} direction="row" mt={2}>
              <Autocomplete
                disablePortal
                id="combo-box-presentacion"
                sx={{ width: '60%' }}
                options={estadoProdcuto}
                onChange={(e) => setFormData({ ...formData, estado: e.target.outerText })}
                renderInput={(params) => <TextField {...params} label="Estado" />}
              />

              <TextField
                name="marca"
                required
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Marca"
                variant="outlined"
              />
            </Stack>
            <Stack spacing={2} direction="row" mt={2}>
              <Autocomplete
                sx={{ width: '60%' }}
                disablePortal
                id="combo-box-demo"
                options={lugaresDeCompra}
                onChange={(e) => setFormData({ ...formData, lugar: e.target.outerText.toUpperCase() })}
                renderInput={(params) => <TextField {...params} label="Lugar de Compra" />}
              />
              <TextField
                name="minima"
                required
                onChange={(e) => handleInputChange(e)}
                color="secondary"
                id="outlined-basic"
                label="Cantidad Mínima"
                type="number"
                variant="outlined"
              />
            </Stack>
            <p>Fecha de Caducidad</p>
            <TextField
              name="fechaCaducidad"
              onChange={(e) => handleInputChange(e)}
              color="secondary"
              id="outlined-basic"
              type="date"
              variant="standard"
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

            <Stack mt={2}>
              <Button type="submit" onClick={onSubmitModal} size="medium" variant="contained">
                Agregar
              </Button>
            </Stack>
          </form>
        </ModalUI>
      </Modal>
      <Snackbar
        autoHideDuration={2000}
        open={showNotificationSuccess}
        message="Artículo Agregado"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="info">Artículo Agregado</Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={2000}
        open={showNotificationError}
        message="Artículo Agregado"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="error">Error al agregar articulo</Alert>
      </Snackbar>
    </>
  );
};

AddProductModal.propTypes = {
  closeModal: PropTypes.func,
  showModal: PropTypes.bool
};

export default AddProductModal;
