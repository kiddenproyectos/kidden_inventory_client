import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui imports
import { Stack, Tooltip, Box, TextField, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// project components
import MainTable from 'ui-component/tables/MainTable';
import ImageModal from './ImageModal';
// project hooks
import useProducts from 'hooks/useProducts';
// utilities
import { fixDateForProductTable, mesesDelAnio } from 'views/utilities/OrganizerDate';

const Products = () => {
  const { allProducts, restartSearch } = useProducts();
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const onClickSearchButton = (value) => {
    const initialArray = [...tableRows];
    const filteredProducts = initialArray.filter((producto) => {
      const nombre = producto.nombre && producto.nombre.S; // Asegúrate de acceder correctamente al nombre
      // Convierte el nombre del producto a minúsculas y verifica si incluye la cadena de búsqueda en minúsculas
      return nombre && nombre.toLowerCase().includes(value);
    });
    setTableRows(filteredProducts);
  };

  useEffect(() => {
    setTableRows(allProducts);
  }, [allProducts]);

  const onClickResetButton = () => {
    restartSearch();
    setSearchValue('');
  };

  const columns = [
    {
      field: 'nombre',
      headerName: 'Artículo',
      width: 200,
      renderCell: (params) => (
        <Stack
          sx={{ cursor: 'pointer', width: '100%' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={(event) => {
            event.stopPropagation();
            console.log(params.row.nombre);
            navigate(`/articulo/${params.row.nombre}`);
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: '500', whiteSpace: 'break-spaces' }}>
            <p>{params.row.nombre}</p>
            <Tooltip title="Entradas y Salidas" placement="top">
              <OpenInNewIcon />
            </Tooltip>
          </div>
        </Stack>
      )
    },
    {
      field: 'image',
      headerName: 'Foto',
      width: 180,
      renderCell: (params) => (
        <Box
          sx={{ height: '220px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          onClick={(event) => {
            event.stopPropagation(); // Detener la propagación del evento de clic
          }}
        >
          <ImageModal imageLink={params.row.image} />
        </Box>
      )
    },
    { field: 'presentacion', headerName: 'Paquete', width: 80 },
    { field: 'modelo', headerName: 'Modelo', width: 80 },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 80
    },
    { field: 'stock', headerName: 'Stock', width: 80 },
    { field: 'lugar', headerName: 'Lugar', width: 100 },
    { field: 'almacen', headerName: 'Existencia', width: 60 },
    { field: 'minima', headerName: 'Mínima', width: 50 },
    { field: 'fechaAgregado', headerName: 'Fecha', width: 100 },
    { field: 'month', headerName: 'Mes', width: 80 },
    { field: 'year', headerName: 'Año', width: 70 }
  ];

  const rows = tableRows.map((items) => ({
    id: items?.id?.S,
    image: items?.imagenes?.S,
    nombre: items?.nombre?.S,
    presentacion: items?.presentacion?.S,
    marca: items?.marca?.S,
    modelo: items?.modelo?.S,
    estado: items?.estado?.S,
    stock: items?.stock?.S,
    lugar: items?.lugar?.S,
    almacen: items?.almacen?.S,
    entradas: items?.entradas?.S,
    salidas: items?.salidas?.S,
    minima: items?.minima?.S,
    fechaAgregado: fixDateForProductTable(items?.fechaAgregado?.S),
    month: mesesDelAnio[items?.month?.S],
    year: items?.year?.S
  }));

  return (
    <div>
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
      </Stack>
      <MainTable rows={rows} columns={columns} inventario />
    </div>
  );
};

export default Products;
