/* eslint-disable */
// react imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// mui imports

import {
  TextField,
  Box,
  Skeleton,
  Tooltip,
  Stack,
  Button,
  Autocomplete,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material/';
// icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// project imports
import MainTable from 'ui-component/tables/MainTable';
import AddProductModal from './AddProductModal';
import ImageModal from './ImageModal';
import ProductInfoModal from './ProductInfoModal';
// hooks
import useProducts from 'hooks/useProducts';
import { useSelector } from 'react-redux';
// utils
import { lugaresDeCompra } from 'utils/productsDataUtils';
import { fixDateForProductTable, compararFechas } from 'views/utilities/OrganizerDate';

// TODO: esta muy incomodo el editar mejor que se abra al dar click al cuadrito de la tabla
// TODO2: la funcion de los colorcitos de la lsita
// TODO3: mandar los cambios

const Users = () => {
  /* eslint-disable */
  const {
    productos,
    deleteProducts,
    restartSearch,
    loader,
    editExistingProductPicture,
    addProduct,
    agregarEntrada,
    restarSalida,
    allProducts,
    editExistingProductData
  } = useProducts();

  const { products } = productos;

  const selectedRows = useSelector((state) => state.product?.id_rows_array);
  const [tableRows, setTableRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showProductInfoModal, setShowProductInfoModal] = useState(false);
  const [infoProducto, setInfoProducto] = useState({});
  const [idModal, setIdModal] = useState('');
  const [editModal, setEditModal] = useState({
    open: false,
    id: null,
    field: '',
    value: '',
    inputType: 'text'
  });
  const navigate = useNavigate();
  const EditFieldModal = ({ open, id, field, value, inputType, onClose, onSave }) => {
    const [newValue, setNewValue] = useState(value);

    useEffect(() => {
      setNewValue(value);
    }, [value]);

    const handleSave = async () => {
      await onSave(id, {
        [field]: newValue
      });
      window.location.reload();
    };

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar {field}</DialogTitle>

        <DialogContent>
          {inputType === 'boolean' ? (
            <Select fullWidth autoFocus value={newValue} onChange={(e) => setNewValue(e.target.value)}>
              <MenuItem value="SI">✅ Sí</MenuItem>
              <MenuItem value="NO">❌ No</MenuItem>
            </Select>
          ) : inputType === 'location' ? (
            <Autocomplete
              autoFocus
              options={lugaresDeCompra}
              getOptionLabel={(option) => option.label || option}
              value={lugaresDeCompra.find((option) => option.label.toUpperCase() === newValue.toUpperCase()) || null}
              onChange={(e, option) => setNewValue(option ? option.label.toUpperCase() : '')}
              renderInput={(params) => <TextField {...params} margin="dense" label="Lugar de compra" />}
            />
          ) : (
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              type={inputType}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
              InputLabelProps={inputType === 'date' ? { shrink: true } : undefined}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>

          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  function removeDuplicates(array, key) {
    const unique = {};
    return array.filter((item) => {
      const keyValue = item[key].S; // Acceder al valor 'S'
      if (!unique[keyValue]) {
        unique[keyValue] = true;
        return true;
      }
      return false;
    });
  }

  useEffect(() => {
    const mergedRows = [...products, ...allProducts];
    const uniqueRows = removeDuplicates(mergedRows, 'id');
    uniqueRows.sort(compararFechas);
    setTableRows(uniqueRows);
  }, [products, allProducts]);

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
    const updatedProducts = serachObjectInArray(tableRows, id);
    setInfoProducto(updatedProducts);
  };
  const openEditModal = ({ id, field, value, number, lugar, fecha, siNo }) => {
    setEditModal({
      open: true,
      id,
      field,
      value: value ?? '',
      inputType: siNo ? 'boolean' : lugar ? 'location' : fecha ? 'date' : number ? 'number' : 'text'
    });
  };
  const closeEditModal = () => {
    setEditModal({
      open: false,
      id: null,
      field: '',
      value: '',
      inputType: 'text'
    });
  };

  const EditableField = ({ value, field, id, number, lugar, fecha, siNo }) => {
    const fieldStyle = {
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap'
    };

    return (
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ cursor: 'pointer', width: '100%' }}
        onClick={() => openEditModal({ id, field, value, number, lugar, fecha, siNo })}
      >
        <div style={fieldStyle}>
          {siNo ? (
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{value === 'SI' ? '✅ Sí' : value === 'NO' ? '❌ No' : '--'}</p>
          ) : (
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{value}</p>
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
              onChange={(e) => editExistingProductPicture({ nombre: params.row.nombre, imagen: e.target.files[0], id: params.row.id })}
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
      width: 200,
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
            <OpenInNewIcon
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/articulo/${params.row.nombre}`);
              }}
            />
          </Tooltip>
        </Stack>
      )
    },
    {
      field: 'presentacion',
      headerName: 'Paquete',
      width: 100,
      renderCell: (params) => {
        return (
          <Stack
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {params.row.caja === 'si' ? (
              <Stack sx={{ fontWeight: '500' }}>
                <p>📦 Caja</p>
                <p>Piezas x caja</p>
                <p>{params.row.piezasPorCaja}</p>
              </Stack>
            ) : (
              <EditableField id={params.row.id} field={params.field} value={params.row.presentacion} />
            )}
          </Stack>
        );
      }
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      width: 100,
      renderCell: (params) => (
        <Stack
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <EditableField id={params.row.id} field={params.field} value={params.row.modelo} />
        </Stack>
      )
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 70,
      renderCell: (params) => {
        return (
          <Stack
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <EditableField id={params.row.id} field={params.field} value={params.row.stock} number />
          </Stack>
        );
      }
    },
    {
      field: 'lugar',
      headerName: 'Lugar',
      width: 120,
      renderCell: (params) => (
        <Stack
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <EditableField lugar id={params.row.id} field={params.field} value={params.row.lugar} />
        </Stack>
      )
    },
    {
      field: 'almacen',
      headerName: 'Existencia',
      width: 80,
      renderCell: (params) => {
        return (
          <Stack
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {params.row.caja === 'si' ? (
              <Stack sx={{ fontWeight: '500' }}>
                <p>Caja:{params.row.almacen}</p>
                <p>Total:</p>
                <p>{params.row.piezasPorCaja * params.row.almacen}</p>
              </Stack>
            ) : (
              <p>
                {params.row.almacen} {params.row.unidad}{' '}
              </p>
            )}
          </Stack>
        );
      }
    },
    {
      field: 'minima',
      headerName: 'Mínima',
      width: 100,
      renderCell: (params) => {
        return (
          <Stack
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <EditableField id={params.row.id} field={params.field} value={params.row.minima} number />
          </Stack>
        );
      }
    },
    { field: 'fechaAgregado', headerName: 'Fecha', width: 150 },
    {
      field: 'fechaCaducidad',
      headerName: 'Fecha de Caducidad',
      width: 200,
      renderCell: (params) => {
        return (
          <Stack
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <EditableField id={params.row.id} field={params.field} value={params.row.fechaCaducidad} fecha />
          </Stack>
        );
      }
    },
    {
      field: 'temu',
      headerName: 'Temu',
      width: 100,
      renderCell: (params) => (
        <Stack
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <EditableField id={params.row.id} field={params.field} value={params.row.temu} siNo />
        </Stack>
      )
    },
    {
      field: 'articulosLimpieza',
      headerName: 'Artículos de Limpieza',
      width: 160,
      renderCell: (params) => (
        <Stack
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <EditableField id={params.row.id} field={params.field} value={params.row.articulosLimpieza} siNo />
        </Stack>
      )
    },
    {
      field: 'informacion',
      headerName: 'Info',
      width: 90,
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
    caja: items?.caja?.S,
    piezasPorCaja: items?.piezasPorCaja?.S,
    fechaAgregado: fixDateForProductTable(items?.fechaAgregado?.S),
    fechaCaducidad: items?.fechaCaducidad?.S || '--',
    unidad: items?.unidad?.S,
    year: items?.year?.S || '--',
    temu: items?.temu?.S,
    articulosLimpieza: items?.articulosLimpieza?.S
  }));

  // --> Extra fucntions for filtereing and searching
  // TODO: add date filter

  const onClickSearchButton = (value) => {
    const initialArray = [...tableRows];
    const filteredProducts = initialArray.filter((producto) => {
      const nombre = producto.nombre && producto.nombre.S; // Asegúrate de acceder correctamente al nombre
      // Convierte el nombre del producto a minúsculas y verifica si incluye la cadena de búsqueda en minúsculas
      return nombre && nombre.toLowerCase().includes(value);
    });
    setTableRows(filteredProducts);
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
                Borrar
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
          <EditFieldModal
            open={editModal.open}
            id={editModal.id}
            field={editModal.field}
            value={editModal.value}
            inputType={editModal.inputType}
            onClose={closeEditModal}
            onSave={editExistingProductData}
          />
        </>
      )}
    </div>
  );
};

export default Users;
