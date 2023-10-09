/* eslint-disable */

import { useEffect, useState } from 'react';
// project imports
import MainTable from 'ui-component/tables/MainTable';
import ProductPageInfoCard from 'ui-component/cards/ProductPageInfoCard';
// project hooks
import useProducts from 'hooks/useProducts';
// mui imports
import { Stack, Box } from '@mui/material';
// utils
import { mesesDelAnio, fixDateForProductTable } from 'views/utilities/OrganizerDate';

const EntradasSalidas = () => {
  const { entradasDeProducto, salidasDeProducto } = useProducts();
  const [sumatoriaEntradas, setSumatoriaEntradas] = useState('');
  const [sumatoriaSalidas, setSumatoriaSalidas] = useState('');

  const entradasColumns = [
    { field: 'nombre', headerName: 'Artículo', width: 200 },
    { field: 'entrada', headerName: 'Cantidad', width: 100 },
    { field: 'fechaAgregado', headerName: 'Fecha de Agregado', width: 200 },
    { field: 'month', headerName: 'Mes', width: 100 },
    { field: 'year', headerName: 'Año', width: 100 }
  ];
  const salidasColumns = [
    { field: 'nombre', headerName: 'Artículo', width: 200 },
    { field: 'salida', headerName: 'Cantidad', width: 100 },
    { field: 'fechaAgregado', headerName: 'Fecha de Salida', width: 200 },
    { field: 'month', headerName: 'Mes', width: 100 },
    { field: 'year', headerName: 'Año', width: 100 }
  ];

  const entradasRows = entradasDeProducto.map((items) => ({
    id: items?.id.S,
    nombre: items?.nombre?.S,
    entrada: items?.entrada?.S,
    fechaAgregado: fixDateForProductTable(items?.fechaAgregado?.S),
    month: mesesDelAnio[items?.month?.S],
    year: items?.year?.S
  }));

  const salidasRows = salidasDeProducto.map((items) => ({
    id: items?.id.S,
    nombre: items?.nombre?.S,
    salida: items?.salida?.S,
    fechaAgregado: fixDateForProductTable(items?.fechaAgregado?.S),
    month: mesesDelAnio[items?.month?.S],
    year: items?.year?.S
  }));
  // Utiliza reduce para calcular la suma de la propiedad 'salida'
  const sumaSalidas = salidasDeProducto.reduce((suma, objeto) => {
    // Convierte la propiedad 'salida' de tipo objeto a número
    const salida = parseInt(objeto.salida.S, 10);

    // Suma la salida al valor acumulado
    return suma + salida;
  }, 0); // El 0 es el valor inicial de la suma

  const sumaEntradas = entradasDeProducto.reduce((suma, objeto) => {
    // Convierte la propiedad 'salida' de tipo objeto a número
    const entrada = parseInt(objeto.entrada.S, 10);

    // Suma la salida al valor acumulado
    return suma + entrada;
  }, 0); // El 0 es el valor inicial de la suma

  useEffect(() => {
    setSumatoriaSalidas(sumaSalidas);
    setSumatoriaEntradas(sumaEntradas);
  }, [salidasDeProducto, entradasDeProducto]);

  return (
    <div>
      {entradasDeProducto.length === 0 ? (
        <p>Aquí no hay entradas 😅</p>
      ) : (
        <Stack direction="row">
          <Box sx={{ width: '60%' }}>
            <p style={{ fontSize: '20px', fontWeight: '500' }}>Entradas</p>
            <Stack direction="row">
              <Stack sx={{ height: '40vh', overflow: 'hidden' }}>
                <MainTable rows={entradasRows} columns={entradasColumns} />
              </Stack>
            </Stack>
            <p style={{ fontSize: '20px', fontWeight: '500' }}>Salidas</p>
            <Stack direction="row">
              <Stack sx={{ height: '40vh', overflow: 'hidden' }}>
                <MainTable rows={salidasRows} columns={salidasColumns} />
              </Stack>
            </Stack>
          </Box>
          <ProductPageInfoCard salidas={sumatoriaSalidas} entradas={sumatoriaEntradas} />
        </Stack>
      )}
    </div>
  );
};

export default EntradasSalidas;
