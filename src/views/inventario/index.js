/* eslint-disable */
// react imports
import { useState } from 'react';

// mui imports
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Switch, TextField, Box, Skeleton } from '@mui/material/';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// project imports
import MainTable from 'ui-component/tables/MainTable';
import AddProductModal from './AddProductModal';
import ImageModal from './ImageModal';
// hooks
import useProducts from 'hooks/useProducts';
import { useSelector } from 'react-redux';

const Users = () => {
  /* eslint-disable */
  const { productos, deleteProducts, searchProduct, restartSearch, loader } = useProducts();
  const { products } = productos;
  const selectedRows = useSelector((state) => state.product?.id_rows_array);
  const [searchValue, setSearchValue] = useState('');

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
    { field: 'nombre', headerName: 'Artículo', width: 400 },
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
    { field: 'lugar', headerName: 'Lugar', width: 200 }
  ];

  const [modal, setModal] = useState(false);

  const rows = products.map((items) => ({
    id: items?.id.S,
    image: items?.imagenes.S,
    nombre: items?.nombre?.S,
    presentacion: items?.presentacion.S,
    marca: items?.marca.S,
    modelo: items?.modelo.S,
    estado: items?.estado.S,
    stock: items?.stock.S,
    lugar: items?.lugar.S
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
        </>
      )}
    </div>
  );
};

export default Users;
