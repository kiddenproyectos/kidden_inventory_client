/* eslint-disable */

import React from 'react';

// mui
import { Modal, Stack, TextField, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// project imports
import ModalUI from 'ui-component/ModalUI';

const ProductInfoModal = ({ show, close, infoProducto }) => {
  return (
    <Modal open={show}>
      <ModalUI closeModal={close} title="Info del Artículo">
        <Stack>
          <p>
            <b>Artículo: {infoProducto?.nombre}</b>
          </p>
        </Stack>
        <Stack>
          <p>
            <b>Existencia en almacen: {infoProducto?.almacen}</b>
          </p>
        </Stack>
        <Stack direction="row" justifyContent="space-between" my={2}>
          <TextField sx={{ width: '80%' }} label="Sumar Entradas" type="number" value={infoProducto?.entradas} />
          <Button variant="contained">
            <AddCircleIcon />
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between" my={2}>
          <TextField sx={{ width: '80%' }} label="Restar Salidas" type="number" color="error" value={infoProducto?.salidas} />
          <Button variant="contained" color="error">
            <RemoveCircleIcon />
          </Button>
        </Stack>
      </ModalUI>
    </Modal>
  );
};

export default ProductInfoModal;
