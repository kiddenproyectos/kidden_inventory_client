/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
// mui imports
import { Button, Box, Stack, Autocomplete, TextField } from '@mui/material';
// project imports
import ImageModal from './ImageModal';
// project hooks
import useProducts from 'hooks/useProducts';
// utils
import { lugaresDeCompra } from 'utils/productsDataUtils';
import Logo from 'ui-component/Logo';
import { useReactToPrint } from 'react-to-print';
// css
import './table.css';

const PrintMaterialList = () => {
  const { allProducts } = useProducts();
  const [noProductsMessage, setNoProductsMessage] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [lugar, setLugar] = useState('Todos los artículos');

  useEffect(() => {
    const filterByNegativeProducts = allProducts
      .filter((item) => Number(item?.almacen?.S) - Number(item?.stock?.S) < 0)
      .sort((a, b) => a.nombre?.S.localeCompare(b.nombre?.S));

    console.log(filterByNegativeProducts);
    setFilteredProducts(filterByNegativeProducts);
    setSelectedProducts(filterByNegativeProducts);
  }, [allProducts]);

  const obtenerCantindad = (almacen, stock) => {
    const resta = (a, b) => a - b;
    const almacenNum = Number(almacen);
    const stockNum = Number(stock);
    return Math.abs(resta(almacenNum, stockNum));
  };
  const columns = ['Producto', 'Foto', 'Cantidad', 'Marca', 'Presentacion', 'Modelo'];
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

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
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
                        <p>
                          <b>{obtenerCantindad(item?.almacen, item?.stock)}</b>
                        </p>
                      </div>
                      <div>
                        <p>{item?.marca}</p>
                      </div>
                      <div>
                        <p>{item?.presentacion}</p>
                      </div>
                      <div>
                        <p>{item?.modelo}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default PrintMaterialList;
