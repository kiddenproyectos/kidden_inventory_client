import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { httpGetAllProducts, httpPostNewProduct, httpDeelteProducts } from './request';

const useProducts = () => {
  const reduxProducts = useSelector((state) => state.product);
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

  const getProducts = useCallback(async () => {
    try {
      const data = await httpGetAllProducts();
      dispatch(populateReduxProducts(data)); // Actualiza el estado de Redux
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }, [dispatch]);

  const addProduct = useCallback(
    async (newProductData) => {
      try {
        // Realizar la solicitud POST para agregar el nuevo producto
        const response = await httpPostNewProduct(newProductData);
        if (response.productoNuevo) {
          // Actualizar el estado de Redux con los nuevos productos
          dispatch(populateReduxProducts([...reduxProducts.products, response.productoNuevo]));
        } else {
          console.error('Error al agregar el producto:', response);
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

  const restartSearch = useCallback(() => {
    location.reload();
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { productos: reduxProducts, addProduct, deleteProducts, searchProduct, restartSearch };
};

export default useProducts;
