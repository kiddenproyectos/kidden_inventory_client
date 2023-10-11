/* eslint-disable */

import { useState, useEffect } from 'react';

// mui
import { Modal, Stack, TextField, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// project imports
import ModalUI from 'ui-component/ModalUI';

const ProductInfoModal = ({ show, close, infoProducto, agregarEntrada, restarSalida }) => {
  const [almacen, setAlmacen] = useState(infoProducto?.almacen?.S);

  const [entradas, setEntradas] = useState(0);
  const [salidas, setSalidas] = useState(0);

  const handleInputChange = (e, stateSetter) => {
    const inputValue = e.target.value;

    // Verifica si el valor es un número válido (mayor o igual a cero)
    if (!isNaN(inputValue) && parseInt(inputValue) >= 0) {
      stateSetter(parseInt(inputValue)); // Convierte el valor a entero si es válido
    }
  };
  // Utiliza useEffect para actualizar almacen cuando infoProducto.almacen cambie
  useEffect(() => {
    setAlmacen(infoProducto?.almacen?.S);
  }, [infoProducto]);

  const onAddEntradaButtonClick = () => {
    agregarEntrada({ almacen, entradas, id: infoProducto?.id?.S, nombre: infoProducto?.nombre?.S });
    setEntradas(0);
  };
  const onRestarSalidasButtonClick = () => {
    restarSalida({ almacen, salidas, minima: infoProducto?.minima?.S, nombre: infoProducto?.nombre?.S, id: infoProducto?.id?.S });
    setSalidas(0);
  };

  return (
    <Modal open={show}>
      <ModalUI
        closeModal={() => {
          close();
          setEntradas(0);
          setSalidas(0);
        }}
        title={infoProducto?.nombre?.S}
      >
        <p>
          <b>Existencia: {almacen}</b>
        </p>
        <p>
          <b>Cantidad minima: {infoProducto?.minima?.S}</b>
        </p>
        <p>
          <b>Stock: {infoProducto?.stock?.S}</b>
        </p>
        <Stack direction="row" justifyContent="space-between" my={2}>
          <TextField
            sx={{ width: '80%' }}
            label="Sumar Entradas"
            type="number"
            value={entradas}
            onChange={(e) => handleInputChange(e, setEntradas)}
          />
          <Button variant="contained" onClick={() => onAddEntradaButtonClick()}>
            <AddCircleIcon />
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between" my={2}>
          <TextField
            sx={{ width: '80%' }}
            label="Restar Salidas"
            type="number"
            color="error"
            value={salidas}
            onChange={(e) => handleInputChange(e, setSalidas)}
          />
          <Button variant="contained" color="error" onClick={() => onRestarSalidasButtonClick()}>
            <RemoveCircleIcon />
          </Button>
        </Stack>
      </ModalUI>
    </Modal>
  );
};

export default ProductInfoModal;
