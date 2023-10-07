/* eslint-disable */
// react imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// mui imports

import { Switch, TextField, Box, Skeleton, Tooltip, Stack, Button } from '@mui/material/';
// icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// project imports
import MainTable from 'ui-component/tables/MainTable';
import AddProductModal from './AddProductModal';
import ImageModal from './ImageModal';
import ProductInfoModal from './ProductInfoModal';
// hooks
import useProducts from 'hooks/useProducts';
import { useSelector } from 'react-redux';

const Users = () => {
  /* eslint-disable */
  const { productos, deleteProducts, searchProduct, restartSearch, loader } = useProducts();
  const { products } = productos;
  const selectedRows = useSelector((state) => state.product?.id_rows_array);
  const [tableRows, setTableRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showProductInfoModal, setShowProductInfoModal] = useState(false);
  const [infoProducto, setInfoProducto] = useState({});
  const [idModal, setIdModal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTableRows(products);
  }, [products]);

  const onCloseProductInfoModal = () => {
    setShowProductInfoModal(false);
    setInfoProducto({});
  };

  // actualizar live el estado del modla cuando cambien los productos

  const serachObjectInArray = (array, id) => {
    const arrayCopy = [...array];
    const productIndex = arrayCopy.findIndex((producto) => producto?.id.S === id);
    const object = array[productIndex];
    return object;
  };
  const onClickColumnInfo = (id) => {
    setIdModal(id);
    const updatedProducts = serachObjectInArray(products, id);
    setInfoProducto(updatedProducts);
  };
  useEffect(() => {
    const updatedProducts = serachObjectInArray(products, idModal);
    setInfoProducto(updatedProducts);
  }, [products]);

  const columns = [
    {
      field: 'image',
      headerName: 'Foto',
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{ height: '220px' }}
          onClick={(event) => {
            event.stopPropagation(); // Detener la propagación del evento de clic
          }}
        >
          <ImageModal imageLink={params.row.image} />
        </Box>
      )
    },
    {
      field: 'nombre',
      headerName: 'Artículo',
      width: 400,
      renderCell: (params) => (
        <Stack
          sx={{ cursor: 'pointer', width: '100%' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/articulo/${params.row.nombre}`);
          }}
        >
          <p style={{ fontSize: '16px', fontWeight: '500' }}>{params.row.nombre}</p>
          <Tooltip title="Entradas y Salidas" placement="top">
            <OpenInNewIcon />
          </Tooltip>
        </Stack>
      )
    },
    { field: 'presentacion', headerName: 'Presentación', width: 200 },
    { field: 'modelo', headerName: 'Modelo', width: 200 },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => (
        <>
          <Switch
            checked={params.row.estado === 'Activo'} // Ajusta esto según la lógica de tu estado
            onClick={(event) => {
              event.stopPropagation(); // Detener la propagación del evento de clic
            }}
          />
        </>
      )
    },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'lugar', headerName: 'Lugar', width: 200 },
    { field: 'almacen', headerName: 'Existencia en almacen', width: 250 },
    { field: 'minima', headerName: 'Cantida mínima', width: 200 },
    {
      field: 'informacion',
      headerName: 'Informacion',
      width: 110,
      renderCell: (params) => (
        <Stack direction="row" justifyContent="center">
          <InfoIcon
            sx={{ cursor: 'pointer' }}
            onClick={(event) => {
              event.stopPropagation();
              setShowProductInfoModal(true);
              onClickColumnInfo(params.row.id);
            }}
          />
        </Stack>
      )
    }
  ];

  const [modal, setModal] = useState(false);

  const rows = tableRows.map((items) => ({
    id: items?.id.S,
    image: items?.imagenes.S,
    nombre: items?.nombre?.S,
    presentacion: items?.presentacion.S,
    marca: items?.marca.S,
    modelo: items?.modelo.S,
    estado: items?.estado.S,
    stock: items?.stock.S,
    lugar: items?.lugar.S,
    almacen: items?.almacen.S,
    entradas: items?.entradas.S,
    salidas: items?.salidas.S,
    minima: items?.minima.S
  }));

  const onClickSearchButton = (value) => {
    searchProduct(value);
  };
  const onClickResetButton = () => {
    restartSearch();
    setSearchValue('');
  };

  const onClickAddProductButton = () => {
    setModal(true);
  };

  return (
    <div>
      {loader ? (
        <>
          <Skeleton variant="rounded" sx={{ marginTop: '8px' }} height={60} />
          <Skeleton variant="rounded" sx={{ marginTop: '8px' }} height={120} />
          <Skeleton variant="rounded" sx={{ marginTop: '8px' }} height={40} />
          <Skeleton variant="rounded" sx={{ marginTop: '8px' }} height={100} />
          <Skeleton variant="rounded" sx={{ marginTop: '8px' }} height={60} />
          <Skeleton variant="rounded" sx={{ marginTop: '8px' }} height={100} />
        </>
      ) : (
        <>
          <Stack spacing={2} direction="row" justifyContent="space-between" mb={4}>
            <Stack spacing={2} direction="row">
              <TextField
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                id="input-with-sx"
                label="Buscar por nombre"
                variant="standard"
              />
              <Button disabled={!searchValue} variant="contained" onClick={() => onClickSearchButton(searchValue)}>
                Buscar
              </Button>
              <Button disabled={!searchValue} variant="contained" onClick={onClickResetButton}>
                <RestartAltIcon />
              </Button>
            </Stack>
            <Stack spacing={2} direction="row" justifyContent="flex-end" mb={4}>
              <Button
                onClick={() => deleteProducts(selectedRows)}
                disabled={!selectedRows.length > 0}
                startIcon={<DeleteForeverIcon />}
                variant="contained"
                color="error"
              >
                Borrar Artículos Seleccionados
              </Button>
              <Button onClick={onClickAddProductButton} startIcon={<PersonAddIcon />} variant="contained">
                Agregar Artículo
              </Button>
            </Stack>
          </Stack>
          <MainTable key={products?.length} rows={rows} columns={columns} inventario />
          <AddProductModal showModal={modal} closeModal={() => setModal(false)} />
          <ProductInfoModal infoProducto={infoProducto} show={showProductInfoModal} close={() => onCloseProductInfoModal()} />
        </>
      )}
    </div>
  );
};

export default Users;
