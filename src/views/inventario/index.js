/* eslint-disable */
// react imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// mui imports

import { TextField, Box, Skeleton, Tooltip, Stack, Button } from '@mui/material/';
// icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
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
  const {
    productos,
    deleteProducts,
    searchProduct,
    restartSearch,
    loader,
    editExistingProductPicture,
    addProduct,
    agregarEntrada,
    restarSalida,
    editExistingProductData
  } = useProducts();

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

  const EditableField = ({ value, field, id }) => {
    const [showEditButton, setShowEditButton] = useState(false);
    const [editableField, setEditableField] = useState(false);
    const [rowValue, setRowValue] = useState(value);

    const [formData, setFormData] = useState({
      [field]: `${value}`
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

    const fieldStyle = {
      wordWrap: 'break-word', // Esta propiedad permite que el texto salte de línea
      whiteSpace: 'pre-wrap' // Esta propiedad mantiene los saltos de línea en el texto original
    };
    const onPressEnterEditablefield = (event) => {
      if (event.key === 'Enter') {
        return editExistingProductData(id, formData).then(() => {
          setEditableField(false);
          setRowValue(formData[field]);
        });
      }
      if (event.key === ' ') {
        event.stopPropagation();
      }
    };
    return (
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        onMouseEnter={() => setShowEditButton(true)}
        onMouseLeave={() => setShowEditButton(false)}
      >
        {showEditButton && <EditIcon onClick={() => setEditableField(true)} />}
        <div style={fieldStyle}>
          {editableField ? (
            <TextField
              onKeyDown={(e) => onPressEnterEditablefield(e)}
              name={field}
              onChange={(e) => handleChange(e)}
              label="Escribe el nuevo nombre"
            />
          ) : (
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{rowValue}</p>
          )}
        </div>
      </Stack>
    );
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
          sx={{ height: '220px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          onClick={(event) => {
            event.stopPropagation(); // Detener la propagación del evento de clic
          }}
        >
          <ImageModal imageLink={params.row.image} />

          <Button>
            Cambiar
            <input
              onChange={(e) => editExistingProductPicture({ nombre: params.row.nombre, imagen: e.target.files[0] })}
              type="file"
              accept="image/*"
              style={{ width: '100%', position: 'absolute', top: 0, left: 0, opacity: 0 }}
            />
          </Button>
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
          }}
        >
          <EditableField id={params.row.id} field={params.field} value={params.row.nombre} />
          <Tooltip title="Entradas y Salidas" placement="top">
            <OpenInNewIcon onClick={() => navigate(`/articulo/${params.row.nombre}`)} />
          </Tooltip>
        </Stack>
      )
    },
    {
      field: 'presentacion',
      headerName: 'Paquete',
      width: 250,
      renderCell: (params) => {
        return (
          <Stack
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <EditableField id={params.row.id} field={params.field} value={params.row.presentacion} />
          </Stack>
        );
      }
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      width: 200,
      renderCell: (params) => (
        <Stack
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <EditableField field={params.field} value={params.row.modelo} />
        </Stack>
      )
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100
    },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'lugar', headerName: 'Lugar', width: 200 },
    { field: 'almacen', headerName: 'Existencia', width: 250 },
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
          <AddProductModal addProduct={addProduct} showModal={modal} closeModal={() => setModal(false)} />
          <ProductInfoModal
            agregarEntrada={agregarEntrada}
            restarSalida={restarSalida}
            infoProducto={infoProducto}
            show={showProductInfoModal}
            close={() => onCloseProductInfoModal()}
          />
        </>
      )}
    </div>
  );
};

export default Users;
