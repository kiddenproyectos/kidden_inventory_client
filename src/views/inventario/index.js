/* eslint-disable */

import { useState } from 'react';

// mui imports
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// project imports
import MainTable from 'ui-component/tables/MainTable';
import AddProductModal from './AddProductModal';
// hooks
import useProducts from 'hooks/useProducts';
import { useSelector } from 'react-redux';

const Users = () => {
  /* eslint-disable */
  const { productos, deleteProducts } = useProducts();
  const { products } = productos;

  const selectedRows = useSelector((state) => state.product?.id_rows_array);

  const columns = [
    { field: 'nombre', headerName: 'Artículo', width: 400 },
    { field: 'presentacion', headerName: 'Presentación', width: 200 },
    { field: 'modelo', headerName: 'Modelo', width: 200 },
    { field: 'estado', headerName: 'Estado', width: 200 },
    { field: 'stock', headerName: 'Stock', width: 200 },
    { field: 'lugar', headerName: 'Lugar', width: 200 }
  ];

  const [modal, setModal] = useState(false);

  const rows = products.map((items) => ({
    id: items?.id.S,
    nombre: items?.nombre?.S,
    presentacion: items?.presentacion.S,
    marca: items?.marca.S,
    modelo: items?.modelo.S,
    estado: items?.estado.S,
    stock: items?.stock.S,
    lugar: items?.lugar.S
  }));

  const onClickAddProductButton = () => {
    setModal(true);
  };

  return (
    <>
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

      <MainTable key={products?.length} rows={rows} columns={columns} />
      <AddProductModal showModal={modal} closeModal={() => setModal(false)} />
    </>
  );
};

export default Users;
