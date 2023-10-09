import React from 'react';
import { useNavigate } from 'react-router-dom';
// mui imports
import { Stack, Tooltip, Switch } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// project components
import MainTable from 'ui-component/tables/MainTable';
// project hooks
import useProducts from 'hooks/useProducts';
// utilities
import { fixDateForProductTable, mesesDelAnio } from 'views/utilities/OrganizerDate';

const Products = () => {
  const { allProducts } = useProducts();
  const navigate = useNavigate();
  console.log(allProducts);

  const columns = [
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
            console.log(params.row.nombre);
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
    { field: 'minima', headerName: 'Cantidad mínima', width: 200 },
    { field: 'fechaAgregado', headerName: 'Fecha Agregado', width: 200 },
    { field: 'month', headerName: 'Mes', width: 200 },
    { field: 'year', headerName: 'Año', width: 200 }
  ];

  const rows = allProducts.map((items) => ({
    id: items?.id.S,
    image: items?.imagenes.S,
    nombre: items?.nombre?.S,
    presentacion: items?.presentacion.S,
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
