import { useState } from 'react';

// mui import
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PasswordIcon from '@mui/icons-material/Password';

// project import
import ModalUI from 'ui-component/ModalUI';
import useUsers from 'hooks/useUsers';

// utils import

const AddUserModal = ({ showModal, closeModal }) => {
  // dropdown options

  const [formData, setFormData] = useState({
    nombre: '',
    rol: 'normal',
    password: ''
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

  const [{ addUser, getPassword }] = useUsers();

  const onClickPasswordIcon = async () => {
    const pass = await getPassword();
    setFormData({ ...formData, password: pass });
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowNotification(false);
  };

  const onSubmitModal = () => {
    // promise linked to the result of adding data
    return addUser(formData).then(() => {
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
        <ModalUI title={'Agregar usuario'} closeModal={closeModal}>
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
            <Stack sx={{ cursor: 'pointer' }} color="secondary">
              <PasswordIcon onClick={onClickPasswordIcon} />
              <TextField
                name="password"
                value={formData.password}
                color="secondary"
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
              />
            </Stack>
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

AddUserModal.propTypes = {
  closeModal: PropTypes.func,
  showModal: PropTypes.bool
};

export default AddUserModal;
