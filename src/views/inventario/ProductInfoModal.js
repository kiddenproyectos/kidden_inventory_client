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
    agregarEntrada({
      almacen,
      entradas,
      id: infoProducto?.id?.S,
      nombre: infoProducto?.nombre?.S,
      caja: infoProducto?.caja?.S,
      piezasTotales: infoProducto?.piezasPorCaja?.S * almacen,
      piezasPorCaja: infoProducto?.piezasPorCaja?.S
    });
    setEntradas(0);
  };
  const onRestarSalidasButtonClick = () => {
    restarSalida({
      almacen,
      salidas,
      minima: infoProducto?.minima?.S,
      nombre: infoProducto?.nombre?.S,
      id: infoProducto?.id?.S,
      caja: infoProducto?.caja?.S,
      piezasTotales: infoProducto?.piezasPorCaja?.S * almacen,
      piezasPorCaja: infoProducto?.piezasPorCaja?.S
    });

    setSalidas(0);
  };

  const ProductoDeCaja = () => {
    return (
      <>
        <p>
          <b>Existencia: {almacen} Cajas</b>
        </p>
        <p>
          <b>Piezas x caja: {infoProducto?.piezasPorCaja?.S} piezas</b>
        </p>
        <p>
          <b>
            Total de piezas : {infoProducto?.piezasPorCaja?.S * almacen} {infoProducto?.unidad?.S}
          </b>
        </p>
        <p>
          <b>
            Cantidad minima: {infoProducto?.minima?.S} {infoProducto?.unidad?.S}
          </b>
        </p>
        <p>
          <b>
            Stock: {infoProducto?.stock?.S} {infoProducto?.unidad?.S}
          </b>
        </p>
      </>
    );
  };

  const ProductoNoCaja = () => {
    return (
      <Stack>
        <p>
          <b>
            Existencia: {almacen} {infoProducto?.unidad?.S}
          </b>
        </p>
        <p>
          <b>
            Cantidad minima: {infoProducto?.minima?.S} {infoProducto?.unidad?.S}
          </b>
        </p>
        <p>
          <b>
            Stock: {infoProducto?.stock?.S} {infoProducto?.unidad?.S}
          </b>
        </p>
      </Stack>
    );
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
        {infoProducto?.caja?.S === 'si' ? <ProductoDeCaja /> : <ProductoNoCaja />}

        <Stack direction="row" justifyContent="space-between" my={2}>
          {infoProducto?.caja?.S === 'si' ? (
            <TextField
              sx={{ width: '80%' }}
              label="Sumar Piezas a la caja"
              type="number"
              value={entradas}
              onChange={(e) => handleInputChange(e, setEntradas)}
            />
          ) : (
            <TextField
              sx={{ width: '80%' }}
              label="Sumar Entradas"
              type="number"
              value={entradas}
              onChange={(e) => handleInputChange(e, setEntradas)}
            />
          )}
          <Button variant="contained" onClick={() => onAddEntradaButtonClick()}>
            <AddCircleIcon />
          </Button>
        </Stack>

        <Stack direction="row" justifyContent="space-between" my={2}>
          {infoProducto?.caja?.S === 'si' ? (
            <TextField
              sx={{ width: '80%' }}
              label="Restar Piezas a la caja"
              type="number"
              color="error"
              value={salidas}
              onChange={(e) => handleInputChange(e, setSalidas)}
            />
          ) : (
            <TextField
              sx={{ width: '80%' }}
              label="Restar Salidas"
              type="number"
              color="error"
              value={salidas}
              onChange={(e) => handleInputChange(e, setSalidas)}
            />
          )}

          <Button variant="contained" color="error" onClick={() => onRestarSalidasButtonClick()}>
            <RemoveCircleIcon />
          </Button>
        </Stack>
      </ModalUI>
    </Modal>
  );
};

export default ProductInfoModal;
