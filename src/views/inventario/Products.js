import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui imports
import { Stack, Tooltip, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// project components
import MainTable from 'ui-component/tables/MainTable';
import ImageModal from './ImageModal';
// project hooks
import useProducts from 'hooks/useProducts';
// utilities
import { fixDateForProductTable, mesesDelAnio } from 'views/utilities/OrganizerDate';

const Products = () => {
  const { allProducts } = useProducts();
  const navigate = useNavigate();

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

  const rows = allProducts.map((items) => ({
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
      <MainTable rows={rows} columns={columns} inventario />
    </div>
  );
};

export default Products;
