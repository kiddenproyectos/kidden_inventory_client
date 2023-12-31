/* eslint-disable */

import { useState, useEffect, useRef } from 'react';
// mui imports
import { Button, Box, Stack, Autocomplete, TextField } from '@mui/material';
// project hooks
import useProducts from 'hooks/useProducts';
// utils
import { lugaresDeCompra } from 'utils/productsDataUtils';
import { useReactToPrint } from 'react-to-print';
import Logo from 'ui-component/Logo';

const ListaDeInventario = () => {
  const { allProducts } = useProducts();

  const [noProductsMessage, setNoProductsMessage] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [lugar, setLugar] = useState('Todos los artículos');

  useEffect(() => {
    setFilteredProducts(allProducts);
    setSelectedProducts(allProducts);
  }, [allProducts]);

  const columns = ['Producto', 'Foto', 'Existencia', 'Marca', 'Modelo', 'Paquete'];

  const rows = filteredProducts.map((items) => ({
    id: items?.id?.S,
    nombre: items?.nombre?.S,
    image: items?.imagenes.S,
    presentacion: items?.presentacion?.S,
    marca: items?.marca?.S,
    modelo: items?.modelo?.S,
    stock: items?.stock?.S,
    lugar: items?.lugar?.S,
    almacen: items?.almacen?.S,
    existencia: items?.almacen?.S,
    caja: items?.caja?.S,
    piezasPorCaja: items?.piezasPorCaja?.S,
    unidad: items?.unidad?.S
  }));

  console.log(rows);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
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
          <Button variant="contained" onClick={handlePrint}>
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
            <>
              <div className="table_container" ref={componentRef} id="printable_div_id">
                <Logo />
                <h2>{lugar}</h2>
                <div className="column_container">
                  {columns.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
                <div>
                  {rows.map((item) => {
                    return (
                      <div key={item?.id} className="table_row">
                        <div>
                          <p>{item?.nombre}</p>
                        </div>
                        <div>
                          <img src={item?.image} alt={item?.name} />
                        </div>
                        <div>
                          <p>{item?.existencia}</p>
                        </div>
                        <div>
                          <p>{item?.marca}</p>
                        </div>
                        <div>
                          <p>{item?.modelo}</p>
                        </div>
                        <div>
                          <p>{item?.presentacion}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          </>
        )}
      </Box>
    </>
  );
};

export default ListaDeInventario;
