import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  httpGetAllProductsPerMonth,
  httpPostNewProduct,
  httpDeelteProducts,
  httpSumarEntrada,
  httpRestarSalidas,
  httpGetAllProducts,
  httpGetEntradaPorProducto,
  httpGetSalidaPorProducto,
  httpPutProductPicture,
  httpEditProductData
} from './request';

const useProducts = () => {
  const { nombre, month } = useParams();
  const reduxProducts = useSelector((state) => state.product);
  const [allProducts, setAllProducts] = useState([]);
  const [entradasDeProducto, setEntradasDeProducto] = useState([]);
  const [salidasDeProducto, setSalidasDeProducto] = useState([]);

  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  const populateReduxProducts = (data) => {
    return (dispatch) => {
      dispatch({ type: 'SET_PRODUCTS', products: data }); // update user
    };
  };

  const emptySelectedRows = (data) => {
    return (dispatch) => {
      dispatch({ type: 'SET_IDS_ROWS', id_rows_array: data });
    };
  };

  const getAllProducts = useCallback(async () => {
    try {
      const data = await httpGetAllProducts();
      setLoader(false);
      setAllProducts(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }, []);

  const getProductsPerMonth = useCallback(
    async (month) => {
      try {
        const data = await httpGetAllProductsPerMonth(month);
        // setLoader(false);
        dispatch(populateReduxProducts(data)); // Actualiza el estado de Redux
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    [dispatch]
  );

  const addProduct = useCallback(
    async (newProductData) => {
      try {
        // Realizar la solicitud POST para agregar el nuevo producto

        const response = await httpPostNewProduct(newProductData);
        if (response.productoNuevo) {
          // Actualizar el estado de Redux con los nuevos productos
          dispatch(populateReduxProducts([...reduxProducts.products, response.productoNuevo]));
          return response;
        } else {
          console.log('Error al agregar el producto:', response);
          return response;
        }
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    },
    [dispatch, reduxProducts]
  );

  const editExistingProductPicture = useCallback(
    async (data) => {
      try {
        const response = await httpPutProductPicture(data);
        if (response.productoEditado) {
          // Clona el array para evitar mutar el estado directamente
          const updatedInventario = [...reduxProducts.products];
          // Encuentra el índice del objeto que deseas actualizar
          const productoIndex = updatedInventario.findIndex((producto) => producto.id.S === response.productoEditado.Attributes.id.S);

          if (productoIndex !== -1) {
            // Realiza las operaciones en el objeto (por ejemplo, actualizar almacen)
            updatedInventario[productoIndex] = {
              ...updatedInventario[productoIndex],
              imagenes: response.productoEditado.Attributes.imagenes
            };

            // Despacha la acción para actualizar el estado en Redux
            dispatch(populateReduxProducts(updatedInventario));
          }
        } else {
          console.log('error al editar foto');
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, reduxProducts]
  );
  const editExistingProductData = useCallback(
    async (id, data) => {
      try {
        const response = await httpEditProductData(id, data);
        if (response.productoEditado) {
          // Clona el array para evitar mutar el estado directamente
          const updatedInventario = [...reduxProducts.products];
          // Encuentra el índice del objeto que deseas actualizar
          const productoIndex = updatedInventario.findIndex((producto) => producto.id.S === response.productoEditado.Attributes.id.S);
          console.log(productoIndex);
          // if (productoIndex !== -1) {
          //   // Realiza las operaciones en el objeto (por ejemplo, actualizar almacen)
          //   updatedInventario[productoIndex] = {
          //     ...updatedInventario[productoIndex],
          //     imagenes: response.productoEditado.Attributes.imagenes
          //   };

          //   // Despacha la acción para actualizar el estado en Redux
          //   dispatch(populateReduxProducts(updatedInventario));
          // }
        } else {
          console.log('error al editar foto');
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    [reduxProducts]
  );
  const deleteProducts = useCallback(
    async (products_ids) => {
      try {
        const response = await httpDeelteProducts(products_ids);
        if (response.deletedProducts) {
          const updatedProducts = reduxProducts.products.filter((product) => !products_ids.includes(product.id.S));
          dispatch(populateReduxProducts(updatedProducts));
          // clean selected rows
          dispatch(emptySelectedRows([]));
        }
      } catch (error) {
        console.error('Error al borrar el producto:', error);
      }
    },
    [dispatch, reduxProducts]
  );

  const searchProduct = useCallback(
    (productNameToSearch) => {
      const productNameToSearchLowerCase = productNameToSearch.toLowerCase();

      const filteredProducts = reduxProducts.products.filter((producto) => {
        const nombre = producto.nombre && producto.nombre.S; // Asegúrate de acceder correctamente al nombre
        // Convierte el nombre del producto a minúsculas y verifica si incluye la cadena de búsqueda en minúsculas
        return nombre && nombre.toLowerCase().includes(productNameToSearchLowerCase);
      });
      dispatch(populateReduxProducts(filteredProducts));
    },
    [reduxProducts, dispatch]
  );

  const agregarEntrada = useCallback(
    async ({ almacen, entradas, nombre, id, caja, piezasTotales, piezasPorCaja }) => {
      try {
        const response = await httpSumarEntrada({ almacen, entradas, nombre, id, caja, piezasTotales, piezasPorCaja });
        if (response.productoEditado) {
          // Clona el array para evitar mutar el estado directamente
          const updatedInventario = [...reduxProducts.products];
          // Encuentra el índice del objeto que deseas actualizar
          const productoIndex = updatedInventario.findIndex((producto) => producto.id.S === response.productoEditado.Attributes.id.S);

          if (productoIndex !== -1) {
            // Realiza las operaciones en el objeto (por ejemplo, actualizar almacen)
            updatedInventario[productoIndex] = {
              ...updatedInventario[productoIndex],
              almacen: response.productoEditado.Attributes.almacen
            };

            // Despacha la acción para actualizar el estado en Redux
            dispatch(populateReduxProducts(updatedInventario));
          }
        }
        return response;
      } catch (error) {
        console.error('Error al editar el producto:', error);
      }
    },
    [dispatch, reduxProducts]
  );

  const restarSalida = useCallback(
    async ({ almacen, salidas, minima, nombre, id, caja, piezasTotales, piezasPorCaja }) => {
      console.log('total', piezasTotales);
      try {
        const response = await httpRestarSalidas({ almacen, salidas, minima, nombre, id, caja, piezasTotales, piezasPorCaja });
        if (response.productoEditado) {
          // Clona el array para evitar mutar el estado directamente
          const updatedInventario = [...reduxProducts.products];
          // Encuentra el índice del objeto que deseas actualizar
          const productoIndex = updatedInventario.findIndex((producto) => producto.id.S === response.productoEditado.Attributes.id.S);

          if (productoIndex !== -1) {
            // Realiza las operaciones en el objeto (por ejemplo, actualizar almacen)
            updatedInventario[productoIndex] = {
              ...updatedInventario[productoIndex],
              almacen: response.productoEditado.Attributes.almacen
            };

            // Despacha la acción para actualizar el estado en Redux
            dispatch(populateReduxProducts(updatedInventario));
          }
        }
        return response;
      } catch (error) {
        console.error('Error al editar el producto:', error);
      }
    },
    [dispatch, reduxProducts]
  );

  const entradasPorProducto = useCallback(async (nombre) => {
    try {
      const response = await httpGetEntradaPorProducto(nombre);
      setEntradasDeProducto(response);
      console.log(response);
    } catch (error) {
      console.error('Error al traer entradas de producto:', error);
    }
  }, []);

  const salidasPorProducto = useCallback(async (nombre) => {
    try {
      const response = await httpGetSalidaPorProducto(nombre);
      setSalidasDeProducto(response);
      console.log(response);
    } catch (error) {
      console.error('Error al traer entradas de producto:', error);
    }
  }, []);

  const restartSearch = useCallback(() => {
    location.reload();
  }, []);

  useEffect(() => {
    if (nombre) {
      entradasPorProducto(nombre);
      // .then(() => salidasPorProducto(nombre));
      salidasPorProducto(nombre);
    } else {
      getAllProducts();
    }
  }, [getProductsPerMonth, month, getAllProducts, entradasPorProducto, nombre, salidasPorProducto]);

  return {
    productos: reduxProducts,
    allProducts,
    addProduct,
    deleteProducts,
    searchProduct,
    restartSearch,
    loader,
    agregarEntrada,
    restarSalida,
    entradasDeProducto,
    salidasDeProducto,
    editExistingProductPicture,
    editExistingProductData
  };
};

export default useProducts;
