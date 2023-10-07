import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { httpGetAllProductsPerMonth, httpPostNewProduct, httpDeelteProducts, httpSumarEntrada, httpRestarSalidas } from './request';

const useProducts = () => {
  const { month } = useParams();
  const reduxProducts = useSelector((state) => state.product);
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

  const getProductsPerMonth = useCallback(async () => {
    try {
      const data = await httpGetAllProductsPerMonth(month);
      setLoader(false);
      dispatch(populateReduxProducts(data)); // Actualiza el estado de Redux
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }, [dispatch, month]);

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
    async ({ almacen, entradas, id }) => {
      try {
        const response = await httpSumarEntrada({ almacen, entradas, id });
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
    async ({ almacen, salidas, minima, nombre, id }) => {
      try {
        const response = await httpRestarSalidas({ almacen, salidas, minima, nombre, id });
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

  const restartSearch = useCallback(() => {
    location.reload();
  }, []);

  useEffect(() => {
    getProductsPerMonth();
  }, [getProductsPerMonth]);

  return { productos: reduxProducts, addProduct, deleteProducts, searchProduct, restartSearch, loader, agregarEntrada, restarSalida };
};

export default useProducts;
