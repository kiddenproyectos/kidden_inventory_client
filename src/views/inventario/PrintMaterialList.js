/* eslint-disable */

import { useState, useEffect } from 'react';
// mui imports
import { Button, Box, Stack, Autocomplete, TextField } from '@mui/material';
// project imports
import MainTable from 'ui-component/tables/MainTable';
import ImageModal from './ImageModal';
// project hooks
import useProducts from 'hooks/useProducts';
// utils
import { lugaresDeCompra } from 'utils/productsDataUtils';
import Logo from 'ui-component/Logo';
// css
import '../../globals.css';

const PrintMaterialList = () => {
  const { allProducts } = useProducts();
  const [noProductsMessage, setNoProductsMessage] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [lugar, setLugar] = useState('Todos los artículos');
  const [logo, setLogo] = useState(false);

  useEffect(() => {
    const filterByNegativeProducts = allProducts.filter((item) => Number(item?.almacen?.S) - Number(item?.stock?.S) < 0);
    setFilteredProducts(filterByNegativeProducts);
    setSelectedProducts(filterByNegativeProducts);
  }, [allProducts]);

  const columns = [
    { field: 'nombre', headerName: 'Artículo', width: 300 },
    {
      field: 'image',
      headerName: 'Foto',
      headerClassName: 'super-app-theme--header',
      width: 200,
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
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      width: 100,
      renderCell: (params) => {
        const resta = (a, b) => a - b;
        const almacen = Number(params.row.almacen);
        const stock = Number(params.row.stock);
        return (
          <>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>{Math.abs(resta(almacen, stock))}</p>
          </>
        );
      }
    },
    { field: 'marca', headerName: 'Marca', width: 150 },
    { field: 'presentacion', headerName: 'Presentacion', width: 150 },
    { field: 'modelo', headerName: 'Modelo', width: 100 }
    // { field: 'lugar', headerName: 'Lugar de Compra', width: 100 }
  ];

  const rows = filteredProducts.map((items) => ({
    id: items?.id?.S,
    nombre: items?.nombre?.S,
    image: items?.imagenes.S,
    presentacion: items?.presentacion?.S,
    marca: items?.marca?.S,
    modelo: items?.modelo?.S,
    stock: items?.stock?.S,
    lugar: items?.lugar?.S,
    almacen: items?.almacen?.S
  }));

  const onClickPrintButton = () => {
    return new Promise((resolve, reject) => {
      // Realiza cualquier trabajo necesario aquí, por ejemplo, establece el logo en true.
      setLogo(true);

      // Luego, puedes llamar a resolve si la operación fue exitosa.
      resolve();
    });
  };

  function printdiv(elem) {
    var header_str = '<html><head><title>' + document.title + '</title></head><body>';
    var footer_str = '</body></html>';
    var new_str = document.getElementById(elem)?.innerHTML;
    var old_str = document.body.innerHTML;
    document.body.innerHTML = header_str + new_str + footer_str;
    window.print();
    document.body.innerHTML = old_str;
    return false;
  }
  //   () => printdiv('printable_div_id'
  const filterByPlace = (place) => {
    const productsToFilter = [...selectedProducts];
    const filtered = productsToFilter.filter((item) => item.lugar.S === place);
    if (filtered.length === 0 && place) {
      setNoProductsMessage(true);
      setFilteredProducts(filtered);
      setSelectedProducts(productsToFilter);
    }
    if (place === undefined) {
      setSelectedProducts(filteredProducts);
      setNoProductsMessage(false);
      setLugar('Todos los artículos');
    } else {
      setNoProductsMessage(false);
      setFilteredProducts(filtered);
      setLugar(place);
    }
  };

  return (
    <>
      <Box>
        <Stack direction="row" justifyContent="center" spacing={2} my={2}>
          <Button
            variant="contained"
            onClick={() => {
              onClickPrintButton()
                .then(() => {
                  printdiv('printable_div_id'); // Asegúrate de reemplazar 'tu_elem_id' con el ID correcto del elemento que deseas imprimir.
                })
                .then(() => location.reload());
            }}
          >
            Imprimir Lista
          </Button>
          <Autocomplete
            sx={{ width: '20%' }}
            disablePortal
            id="combo-box-demo"
            options={lugaresDeCompra}
            onChange={(e) => filterByPlace(e.target.outerText?.toUpperCase())}
            renderInput={(params) => <TextField {...params} label="Selecciona por  Lugar de Compra" />}
          />
        </Stack>
        {noProductsMessage ? (
          'no hay productos dados de alta en ese lugar'
        ) : (
          <>
            <div id="printable_div_id">
              {logo && <Logo />}
              <h2>{lugar}</h2>
              <MainTable print inventario rows={rows} columns={columns} />
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default PrintMaterialList;
